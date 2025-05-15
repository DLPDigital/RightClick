import React, { useState, useEffect } from "react"
import "./App.css"
import { GameState, ScreenName } from "./types"
// import { GameState, ScreenName, Upgrade, MonetizationOption, Achievement } from './types';
import { INSANITY_STAGES } from "./data/insanityLevels"
import { INITIAL_UPGRADES } from "./data/upgrades"
import { INITIAL_MONETIZATION_OPTIONS } from "./data/monetization"
import { INITIAL_ACHIEVEMENTS } from "./data/achievements"

import NavBar from "./components/NavBar"
import StatusBar from "./components/StatusBar"
import PostingScreen from "./screens/PostingScreen"
import MonetizationScreen from "./screens/MonetizationScreen"
import UpgradesScreen from "./screens/UpgradesScreen"
import AchievementsScreen from "./screens/AchievementsScreen"
import SettingsScreen from "./screens/SettingsScreen"
import { useGameState } from "./hooks/useGameState"
import { useCalculateRates } from "./hooks/useCalculateRates"

const SAVE_KEY = "conspiracyClickerSave"
const TICK_INTERVAL = 100 // Milliseconds for game tick

const initialGameState: GameState = {
  money: 0,
  followers: 0,
  postsMade: 0,
  insanityLevelIndex: 0,
  followersPerClick: 1,
  passiveFollowersPerSecond: 0,
  baseMoneyPerFollowerPerSecond: 0.001,
  upgrades: JSON.parse(JSON.stringify(INITIAL_UPGRADES)), // This is fine as upgrades don't have functions
  monetizationOptions: JSON.parse(JSON.stringify(INITIAL_MONETIZATION_OPTIONS)),
  achievements: INITIAL_ACHIEVEMENTS, // Direct reference instead of deep copy
  lastTick: Date.now(),
}

function App() {
  const { gameState, setGameState } = useGameState()

  const [currentScreen, setCurrentScreen] = useState<ScreenName>("posting")

  const calculateRates = useCalculateRates()

  // --- CORE GAME LOGIC ---

  // Game Tick
  useEffect(() => {
    const intervalId = setInterval(() => {
      setGameState((prev) => {
        const now = Date.now()
        const deltaSeconds = (now - prev.lastTick) / 1000

        const rates = calculateRates(prev)

        let newFollowers = prev.followers + rates.calculatedPassiveFollowersPerSecond * deltaSeconds

        let moneyFromFollowers =
          newFollowers * rates.calculatedMoneyPerFollowerPerSecond * deltaSeconds

        let moneyFromMonetization = 0
        Object.values(prev.monetizationOptions).forEach((opt) => {
          if (opt.active) {
            moneyFromMonetization += opt.moneyPerSecond * deltaSeconds
          }
        })

        let newMoney = prev.money + moneyFromFollowers + moneyFromMonetization

        // Update Insanity Level
        let newInsanityIndex = prev.insanityLevelIndex
        for (let i = INSANITY_STAGES.length - 1; i >= 0; i--) {
          if (prev.postsMade >= INSANITY_STAGES[i].threshold && i > newInsanityIndex) {
            newInsanityIndex = i
            // Could add a notification here: "You've reached a new level of insanity: ..."
            break
          }
        }

        const nextState: GameState = {
          ...prev,
          money: newMoney,
          followers: newFollowers,
          insanityLevelIndex: newInsanityIndex,
          followersPerClick: rates.calculatedFollowersPerClick,
          passiveFollowersPerSecond: rates.calculatedPassiveFollowersPerSecond,
          // baseMoneyPerFollowerPerSecond is handled by upgrades now
          lastTick: now,
        }

        // Check for unlocks (upgrades, monetization)
        Object.keys(nextState.upgrades).forEach((key) => {
          const upg = nextState.upgrades[key]
          if (!upg.unlocked && upg.requirement && upg.requirement(nextState)) {
            nextState.upgrades[key] = { ...upg, unlocked: true }
          }
        })
        Object.keys(nextState.monetizationOptions).forEach((key) => {
          const opt = nextState.monetizationOptions[key]
          if (!opt.unlocked && opt.requirement && opt.requirement(nextState)) {
            nextState.monetizationOptions[key] = { ...opt, unlocked: true }
          }
        })

        // Check Achievements
        Object.keys(nextState.achievements).forEach((key) => {
          const ach = nextState.achievements[key]
          if (!ach.unlocked && ach.condition(nextState)) {
            nextState.achievements[key] = { ...ach, unlocked: true }
            console.log(`Achievement Unlocked: ${ach.name}`) // TODO: Better notification
            if (ach.reward) {
              // This part is tricky, as reward might change state that affects conditions
              // For simplicity, apply rewards directly. Be cautious with complex rewards.
              const rewardChanges = ach.reward(nextState)
              Object.assign(nextState, rewardChanges)
            }
          }
        })

        return nextState
      })
    }, TICK_INTERVAL)

    return () => clearInterval(intervalId)
  }, [calculateRates]) // Empty dependency array means this runs once on mount

  // Save game state whenever it changes
  useEffect(() => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(gameState))
  }, [gameState])

  // --- ACTIONS ---
  const handlePost = () => {
    setGameState((prev) => ({
      ...prev,
      followers: prev.followers + prev.followersPerClick,
      postsMade: prev.postsMade + 1,
    }))
  }

  const handlePurchaseUpgrade = (id: string) => {
    setGameState((prev) => {
      const upgrade = prev.upgrades[id]
      if (!upgrade || (upgrade.maxLevel !== undefined && upgrade.level >= upgrade.maxLevel))
        return prev

      const cost = upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.level)
      if (prev.money >= cost) {
        const newUpgrades = {
          ...prev.upgrades,
          [id]: { ...upgrade, level: upgrade.level + 1 },
        }

        // If this upgrade unlocks others
        if (upgrade.unlocks) {
          upgrade.unlocks.forEach((unlockId) => {
            if (newUpgrades[unlockId] && !newUpgrades[unlockId].unlocked) {
              newUpgrades[unlockId] = { ...newUpgrades[unlockId], unlocked: true }
            } else if (
              prev.monetizationOptions[unlockId] &&
              !prev.monetizationOptions[unlockId].unlocked
            ) {
              // It might unlock a monetization option
              // This part needs a bit more robust handling if unlocks are mixed type
            }
          })
        }

        // Recalculate rates immediately after purchase for UI responsiveness
        const rates = calculateRates({ ...prev, upgrades: newUpgrades })

        return {
          ...prev,
          money: prev.money - cost,
          upgrades: newUpgrades,
          followersPerClick: rates.calculatedFollowersPerClick,
          passiveFollowersPerSecond: rates.calculatedPassiveFollowersPerSecond,
        }
      }
      return prev
    })
  }

  const handleActivateMonetization = (id: string) => {
    setGameState((prev) => {
      const option = prev.monetizationOptions[id]
      if (!option || option.active) return prev

      if (prev.money >= option.costToActivate && prev.followers >= option.followerRequirement) {
        return {
          ...prev,
          money: prev.money - option.costToActivate,
          monetizationOptions: {
            ...prev.monetizationOptions,
            [id]: { ...option, active: true },
          },
        }
      }
      return prev
    })
  }

  const handleExportGame = () => {
    return JSON.stringify(gameState)
  }

  const handleImportGame = (data: string) => {
    try {
      const importedState = JSON.parse(data) as GameState
      // Basic validation (can be more thorough)
      if (typeof importedState.money !== "number" || typeof importedState.followers !== "number") {
        throw new Error("Invalid save data structure.")
      }
      setGameState({
        ...initialGameState, // Start with defaults to ensure all keys exist
        ...importedState, // Overlay imported data
        upgrades: { ...initialGameState.upgrades, ...importedState.upgrades }, // Merge deeply
        monetizationOptions: {
          ...initialGameState.monetizationOptions,
          ...importedState.monetizationOptions,
        },
        achievements: { ...initialGameState.achievements, ...importedState.achievements },
        lastTick: Date.now(), // Reset tick to prevent huge offline jumps immediately
      })
    } catch (e) {
      console.error("Import failed:", e)
      throw e // Re-throw to be caught by SettingsScreen
    }
  }

  const handleResetGame = () => {
    if (window.confirm("Are you sure you want to reset your game? All progress will be lost!")) {
      // Create fresh achievements with original conditions
      const resetState = {
        ...initialGameState,
        // Start with a fresh empty object for achievements
        achievements: Object.keys(INITIAL_ACHIEVEMENTS).reduce(
          (acc, key) => ({
            ...acc,
            [key]: {
              ...INITIAL_ACHIEVEMENTS[key],
              unlocked: false,
            },
          }),
          {}
        ), // Changed from INITIAL_ACHIEVEMENTS to {}
        lastTick: Date.now(),
      }

      setGameState(resetState)
      localStorage.removeItem(SAVE_KEY)
    }
  }

  // --- RENDER LOGIC ---
  const renderScreen = () => {
    switch (currentScreen) {
      case "posting":
        return (
          <PostingScreen
            followers={gameState.followers}
            followersPerClick={gameState.followersPerClick}
            postsMade={gameState.postsMade}
            onPost={handlePost}
          />
        )
      case "monetization":
        return (
          <MonetizationScreen
            gameState={gameState}
            onActivateMonetization={handleActivateMonetization}
          />
        )
      case "upgrades":
        return <UpgradesScreen gameState={gameState} onPurchaseUpgrade={handlePurchaseUpgrade} />
      case "achievements":
        return <AchievementsScreen achievements={gameState.achievements} />
      case "settings":
        return (
          <SettingsScreen
            onExport={handleExportGame}
            onImport={handleImportGame}
            onReset={handleResetGame}
          />
        )
      default:
        return <p>Unknown Screen</p>
    }
  }

  const currentInsanityStage = INSANITY_STAGES[gameState.insanityLevelIndex] || INSANITY_STAGES[0]

  // console.log('Game State:', gameState);
  return (
    <div className="App">
      <StatusBar
        money={gameState.money}
        followers={gameState.followers}
        currentInsanityStage={currentInsanityStage}
        baseMoneyPerFollowerPerSecond={gameState.baseMoneyPerFollowerPerSecond}
      />
      <NavBar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      <div className="screen-content">{renderScreen()}</div>
      <footer>
        <p style={{ fontSize: "0.8em", textAlign: "center", marginTop: "20px", color: "#080" }}>
          Conspiracy Clicker v0.1 - Remember, it's just a game... or is it?
        </p>
      </footer>
    </div>
  )
}

export default App
