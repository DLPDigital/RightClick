// page.tsx

"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import "./App.css" // Ensure this file exists or remove if not used

import { GameState, ScreenName } from "./types" // Assuming AchievementType is your definition type from types.ts
// import { GameState, ScreenName, Achievement as AchievementType } from "./types"; // Assuming AchievementType is your definition type from types.ts
import { INSANITY_STAGES } from "./data/insanityLevels"
import { initialGameState, SAVE_KEY, GAME_TICK_INTERVAL } from "./data/constants"
import { INITIAL_MONETIZATION_OPTIONS } from "./data/monetization"
import { INITIAL_UPGRADES } from "./data/upgrades"
import { INITIAL_ACHIEVEMENTS } from "./data/achievements" // Ensure this exports Record<string, AchievementDefinitionOrSimilar>

import NavBar from "./components/NavBar"
import StatusBar from "./components/StatusBar"
import PostingScreen from "./screens/PostingScreen"
import MonetizationScreen from "./screens/MonetizationScreen"
import UpgradesScreen from "./screens/UpgradesScreen"
import AchievementsScreen from "./screens/AchievementsScreen"
import SettingsScreen from "./screens/SettingsScreen"

const DEBOUNCED_SAVE_INTERVAL = 10000 // 10 seconds

// Helper: Calculate game rates (followers, money per second, etc.)
const calculateRates = (
  gs: GameState
): {
  calculatedFollowersPerClick: number
  calculatedPassiveFollowersPerSecond: number
  calculatedMoneyPerFollowerPerSecond: number
} => {
  let followersPerClick = 1 // Base value
  let passiveFollowersPerSecond = 0
  let moneyPerFollowerBonusTotal = 0

  const upgrades = Array.isArray(gs.upgrades) ? gs.upgrades : []

  upgrades.forEach(({ id, level }) => {
    const upgradeDetails = INITIAL_UPGRADES[id]
    if (upgradeDetails && level > 0) {
      if (upgradeDetails.followersPerClickBonus) {
        followersPerClick += upgradeDetails.followersPerClickBonus * level
      }
      if (upgradeDetails.passiveFollowersPerSecondBonus) {
        passiveFollowersPerSecond += upgradeDetails.passiveFollowersPerSecondBonus * level
      }
      if (upgradeDetails.moneyPerFollowerBonus) {
        moneyPerFollowerBonusTotal += upgradeDetails.moneyPerFollowerBonus * level
      }
    }
  })

  return {
    calculatedFollowersPerClick: followersPerClick,
    calculatedPassiveFollowersPerSecond: passiveFollowersPerSecond,
    calculatedMoneyPerFollowerPerSecond:
      gs.baseMoneyPerFollowerPerSecond * (1 + moneyPerFollowerBonusTotal),
  }
}

function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    console.log("STATE_INIT: Initializing gameState...")
    let loadedState: GameState | null = null

    if (typeof window !== "undefined") {
      const savedGame = localStorage.getItem(SAVE_KEY)
      console.log(
        "LOAD: Attempting to load game. Saved data string:",
        savedGame ? `"${savedGame.substring(0, 100)}..."` : null
      )
      if (savedGame) {
        try {
          const parsedState = JSON.parse(savedGame)
          console.log("LOAD: Parsed saved game object:", parsedState)

          if (
            parsedState &&
            typeof parsedState.money === "number" &&
            typeof parsedState.followers === "number" &&
            Array.isArray(parsedState.upgrades) &&
            Array.isArray(parsedState.monetizationOptions) &&
            Array.isArray(parsedState.unlockedAchievements) &&
            typeof parsedState.lastTick === "number"
          ) {
            console.log("LOAD: Saved game data structure is valid. Hydrating state.")
            loadedState = {
              ...initialGameState, // Base defaults
              ...parsedState, // Override with saved values
              // Ensure arrays are new instances
              upgrades: [...parsedState.upgrades],
              monetizationOptions: [...parsedState.monetizationOptions],
              unlockedAchievements: [...parsedState.unlockedAchievements],
              lastTick: Date.now(), // Reset lastTick to now to prevent huge catch-up
            }
          } else {
            console.warn(
              "LOAD: Saved game data structure is invalid or incomplete. Using initial state."
            )
          }
        } catch (e) {
          console.error("LOAD: Failed to parse saved game, using initial state:", e)
        }
      } else {
        console.log("LOAD: No saved game found. Using initial state.")
      }
    }

    const finalInitialState = loadedState || {
      ...initialGameState,
      upgrades: [...initialGameState.upgrades], // Ensure fresh arrays
      monetizationOptions: [...initialGameState.monetizationOptions],
      unlockedAchievements: [...initialGameState.unlockedAchievements],
      lastTick: Date.now(),
    }
    console.log("STATE_INIT: GameState initialized. Posts:", finalInitialState.postsMade)
    return finalInitialState
  })

  const [currentScreen, setCurrentScreen] = useState<ScreenName>("posting")

  // Ref to hold the latest gameState for use in intervals
  const gameStateRef = useRef(gameState)
  useEffect(() => {
    // console.log("REF_UPDATE: gameStateRef.current updated. Posts:", gameState.postsMade);
    gameStateRef.current = gameState
  }, [gameState])

  // --- Game Logic Callbacks ---
  const tick = useCallback(() => {
    setGameState((prevGameState) => {
      const now = Date.now()
      const deltaSeconds = (now - prevGameState.lastTick) / 1000
      const cappedDeltaSeconds = Math.min(deltaSeconds, 300) // Cap at 5 mins offline progress

      const rates = calculateRates(prevGameState)

      const currentFollowers = prevGameState.followers // Use current for MPS calc before adding passive
      const passiveFollowersEarned = rates.calculatedPassiveFollowersPerSecond * cappedDeltaSeconds
      const newFollowers = currentFollowers + passiveFollowersEarned

      const moneyFromFollowers =
        newFollowers * rates.calculatedMoneyPerFollowerPerSecond * cappedDeltaSeconds

      let moneyFromMonetization = 0
      const currentMonetizationOptions = Array.isArray(prevGameState.monetizationOptions)
        ? prevGameState.monetizationOptions
        : []
      currentMonetizationOptions.forEach((opt) => {
        if (opt.active) {
          const monetizationData = INITIAL_MONETIZATION_OPTIONS[opt.id]
          if (monetizationData) {
            moneyFromMonetization += monetizationData.moneyPerSecond * cappedDeltaSeconds
          }
        }
      })

      const newMoney = prevGameState.money + moneyFromFollowers + moneyFromMonetization

      const moneyPerSecondFromFollowers =
        currentFollowers * rates.calculatedMoneyPerFollowerPerSecond
      const moneyPerSecondFromMonetization = currentMonetizationOptions
        .filter((opt) => opt.active)
        .reduce((sum, opt) => {
          const monetizationData = INITIAL_MONETIZATION_OPTIONS[opt.id]
          return sum + (monetizationData?.moneyPerSecond || 0)
        }, 0)
      const totalMoneyPerSecond = moneyPerSecondFromFollowers + moneyPerSecondFromMonetization

      let newInsanityIndex = prevGameState.insanityLevelIndex
      for (let i = INSANITY_STAGES.length - 1; i >= 0; i--) {
        if (prevGameState.postsMade >= INSANITY_STAGES[i].threshold && i > newInsanityIndex) {
          newInsanityIndex = i
          break
        }
      }

      let nextState: GameState = {
        ...prevGameState,
        money: newMoney,
        followers: newFollowers,
        moneyPerSecond: totalMoneyPerSecond,
        insanityLevelIndex: newInsanityIndex,
        followersPerClick: rates.calculatedFollowersPerClick,
        passiveFollowersPerSecond: rates.calculatedPassiveFollowersPerSecond,
        lastTick: now,
        upgrades: [...prevGameState.upgrades],
        monetizationOptions: [...currentMonetizationOptions], // Use the guarded copy
        unlockedAchievements: [...prevGameState.unlockedAchievements],
      }

      // Unlockables (Upgrades)
      const newlyUnlockedUpgrades: { id: string; level: number }[] = []
      Object.entries(INITIAL_UPGRADES).forEach(([id, upgradeData]) => {
        if (
          !nextState.upgrades.some((u) => u.id === id) &&
          upgradeData.requirement &&
          upgradeData.requirement(nextState)
        ) {
          newlyUnlockedUpgrades.push({ id, level: 0 })
        }
      })
      if (newlyUnlockedUpgrades.length > 0) {
        nextState.upgrades = [...nextState.upgrades, ...newlyUnlockedUpgrades]
      }

      // Unlockables (Monetization)
      const newlyUnlockedMonetization: { id: string; active: boolean }[] = []
      Object.entries(INITIAL_MONETIZATION_OPTIONS).forEach(([id, monetizationData]) => {
        if (
          !nextState.monetizationOptions.some((m) => m.id === id) &&
          monetizationData.requirement &&
          monetizationData.requirement(nextState)
        ) {
          newlyUnlockedMonetization.push({ id, active: false })
        }
      })
      if (newlyUnlockedMonetization.length > 0) {
        nextState.monetizationOptions = [
          ...nextState.monetizationOptions,
          ...newlyUnlockedMonetization,
        ]
      }

      // Unlockables (Achievements)
      const newlyUnlockedAchievementIds: string[] = []
      Object.entries(INITIAL_ACHIEVEMENTS).forEach(([id, achievementDef]) => {
        if (!nextState.unlockedAchievements.includes(id) && achievementDef.condition(nextState)) {
          newlyUnlockedAchievementIds.push(id)
          if (achievementDef.reward) {
            const rewards = achievementDef.reward(nextState)
            nextState = { ...nextState, ...rewards }
          }
        }
      })
      if (newlyUnlockedAchievementIds.length > 0) {
        nextState.unlockedAchievements = [
          ...nextState.unlockedAchievements,
          ...newlyUnlockedAchievementIds,
        ]
      }

      return nextState
    })
  }, []) // Dependencies: calculateRates (stable), constants (stable)

  const handlePost = useCallback(() => {
    setGameState((prevGameState) => ({
      ...prevGameState,
      followers: prevGameState.followers + prevGameState.followersPerClick,
      postsMade: prevGameState.postsMade + 1,
    }))
  }, [])

  const handlePurchaseUpgrade = useCallback((id: string) => {
    setGameState((prevGameState) => {
      const upgradeData = INITIAL_UPGRADES[id]
      const existingUpgrade = prevGameState.upgrades.find((u) => u.id === id)
      const currentLevel = existingUpgrade?.level ?? 0

      if (
        !upgradeData ||
        (upgradeData.maxLevel !== undefined && currentLevel >= upgradeData.maxLevel)
      ) {
        return prevGameState
      }

      const cost = upgradeData.baseCost * Math.pow(upgradeData.costMultiplier, currentLevel)
      if (prevGameState.money >= cost) {
        const newUpgrades = prevGameState.upgrades.map((u) =>
          u.id === id ? { ...u, level: u.level + 1 } : u
        )

        const stateAfterPurchase: GameState = {
          ...prevGameState,
          money: prevGameState.money - cost,
          upgrades: newUpgrades,
        }
        const rates = calculateRates(stateAfterPurchase) // Recalculate rates
        return {
          ...stateAfterPurchase,
          followersPerClick: rates.calculatedFollowersPerClick,
          passiveFollowersPerSecond: rates.calculatedPassiveFollowersPerSecond,
        }
      }
      return prevGameState
    })
  }, [])

  const handleActivateMonetization = useCallback((id: string) => {
    setGameState((prevGameState) => {
      const monetizationData = INITIAL_MONETIZATION_OPTIONS[id]
      const existingOption = (
        Array.isArray(prevGameState.monetizationOptions) ? prevGameState.monetizationOptions : []
      ).find((m) => m.id === id)

      if (!monetizationData || (existingOption && existingOption.active)) {
        return prevGameState
      }

      if (
        prevGameState.money >= monetizationData.costToActivate &&
        prevGameState.followers >= monetizationData.followerRequirement
      ) {
        const newMonetizationOptions = (
          Array.isArray(prevGameState.monetizationOptions) ? prevGameState.monetizationOptions : []
        ).map((m) => (m.id === id ? { ...m, active: true } : m))

        // Ensure it's in the array if it was just unlocked (should be by tick logic)
        if (!newMonetizationOptions.find((m) => m.id === id) && monetizationData) {
          newMonetizationOptions.push({ id, active: true })
        }

        return {
          ...prevGameState,
          money: prevGameState.money - monetizationData.costToActivate,
          monetizationOptions: newMonetizationOptions,
        }
      }
      return prevGameState
    })
  }, [])

  const handleExportGame = useCallback(() => {
    return JSON.stringify(gameStateRef.current) // Export latest state from ref
  }, []) // gameStateRef itself is stable

  const handleImportGame = useCallback((data: string) => {
    try {
      const importedState = JSON.parse(data) as GameState
      if (
        typeof importedState.money !== "number" ||
        typeof importedState.followers !== "number" ||
        !Array.isArray(importedState.upgrades) ||
        !Array.isArray(importedState.monetizationOptions) ||
        !Array.isArray(importedState.unlockedAchievements)
      ) {
        throw new Error("Invalid save data structure.")
      }
      setGameState({
        // This will trigger a re-render and update gameStateRef via its own useEffect
        ...initialGameState,
        ...importedState,
        upgrades: [...importedState.upgrades],
        monetizationOptions: [...importedState.monetizationOptions],
        unlockedAchievements: [...importedState.unlockedAchievements],
        lastTick: Date.now(),
      })
      alert("Game imported successfully!")
    } catch (e) {
      console.error("Import failed:", e)
      alert("Failed to import game data. It might be corrupted.")
    }
  }, []) // initialGameState is stable

  const handleResetGame = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Are you sure you want to reset your game?")
    ) {
      const freshGameState = {
        ...initialGameState,
        upgrades: initialGameState.upgrades.map((u) => ({ ...u })),
        monetizationOptions: initialGameState.monetizationOptions.map((m) => ({ ...m })),
        unlockedAchievements: [...initialGameState.unlockedAchievements],
        lastTick: Date.now(),
      }
      setGameState(freshGameState) // Triggers re-render & gameStateRef update
      if (typeof window !== "undefined") {
        localStorage.removeItem(SAVE_KEY)
        console.log("RESET: Game reset and save key removed.")
      }
    }
  }, []) // initialGameState is stable

  // --- Game Tick Interval ---
  useEffect(() => {
    console.log("TICK_EFFECT: Setting up game tick interval.")
    const tickIntervalId = setInterval(tick, GAME_TICK_INTERVAL)
    return () => {
      console.log("TICK_EFFECT: Clearing game tick interval.")
      clearInterval(tickIntervalId)
    }
  }, [tick]) // 'tick' is stable due to useCallback with empty deps

  // --- Periodic Save Logic ---
  useEffect(() => {
    console.log("SAVE_EFFECT: Setting up periodic save interval.") // Should see this ONCE on mount (or twice in StrictMode)

    const saveIntervalId = setInterval(() => {
      if (typeof window !== "undefined") {
        const currentStateToSave = gameStateRef.current
        console.log(
          `--- PERIODIC SAVE ATTEMPT --- (every ${DEBOUNCED_SAVE_INTERVAL / 1000}s). Saving. Posts: ${currentStateToSave.postsMade}, Money: ${currentStateToSave.money.toFixed(0)}`
        )
        localStorage.setItem(SAVE_KEY, JSON.stringify(currentStateToSave))
      }
    }, DEBOUNCED_SAVE_INTERVAL)

    return () => {
      console.log("SAVE_EFFECT: Clearing periodic save interval.")
      clearInterval(saveIntervalId)
    }
  }, []) // EMPTY DEPENDENCY ARRAY: runs once on mount, cleans up on unmount.

  const currentInsanityStage = useMemo(() => {
    return INSANITY_STAGES[gameState.insanityLevelIndex] || INSANITY_STAGES[0]
  }, [gameState.insanityLevelIndex])

  // --- Render ---
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
        return (
          <AchievementsScreen
            allAchievements={INITIAL_ACHIEVEMENTS}
            unlockedAchievementIds={gameState.unlockedAchievements}
          />
        )
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
  // console.log("APP RENDER. Posts:", gameState.postsMade, "Screen:", currentScreen); // Useful for seeing re-renders

  return (
    <div className="App">
      <StatusBar
        money={gameState.money}
        followers={gameState.followers}
        currentInsanityStage={currentInsanityStage}
        moneyPerSecond={gameState.moneyPerSecond}
      />
      <NavBar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      <div className="screen-content">{renderScreen()}</div>
      <footer>
        <p style={{ fontSize: "0.8em", textAlign: "center", marginTop: "20px", color: "#080" }}>
          Conspiracy Clicker v0.1 - Remember, it&apos;s just a game... or is it?
        </p>
      </footer>
    </div>
  )
}

export default App
