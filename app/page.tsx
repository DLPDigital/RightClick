"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import "./App.css"
import "./theme/theme.css"

import { ScreenName } from "./types"
import { INSANITY_STAGES } from "./data/insanityLevels"
import { GAME_TICK_INTERVAL } from "./data/constants"

import { useGameEngine, GameEngineHook } from "./hooks/useGameEngine"
import { useGamePersistence, GamePersistenceHook } from "./hooks/useGamePersistence"
import { useUpgrades, UpgradesHook } from "./hooks/useUpgrades"
import { useMonetization, MonetizationHook } from "./hooks/useMonetization"

import { NavBar } from "./components/NavBar"
import StatusBar from "./components/StatusBar"
import UpgradesScreen from "./screens/UpgradesScreen"
import { Achievements } from "./components/Screens/Achievements"
import { Posting } from "./components/Screens/Posting"
import { Monetization } from "./components/Screens/Monetization"
import SettingsScreen from "./screens/SettingsScreen"
import { INITIAL_ACHIEVEMENTS } from "./data/achievements"
import { vars } from "./theme/theme.css"
import { Footer } from "./components/Footer"

function App() {
  // --- State for UI Navigation ---
  const [currentScreen, setCurrentScreen] = useState<ScreenName>("posting")

  // --- Initialize Custom Hooks ---
  // Core game engine (manages gameState via reducer, provides dispatch)
  const { gameState, dispatch, gameStateRef }: GameEngineHook = useGameEngine()

  // Persistence (saving, loading, import/export, reset)
  const { handleExportGame, handleImportGame, handleResetGame }: GamePersistenceHook =
    useGamePersistence(gameStateRef, dispatch)

  // Upgrades logic
  const { availableUpgrades, handlePurchaseUpgrade }: UpgradesHook = useUpgrades(
    gameState,
    dispatch
  )

  // Monetization logic
  const { availableMonetization, handleActivateMonetization }: MonetizationHook = useMonetization(
    gameState,
    dispatch
  )

  // --- Game Tick Dispatch ---
  useEffect(() => {
    console.log("PAGE.TSX: Setting up game tick dispatch interval.")
    const tickIntervalId = setInterval(() => {
      dispatch({ type: "TICK" })
    }, GAME_TICK_INTERVAL)

    return () => {
      console.log("PAGE.TSX: Clearing game tick dispatch interval.")
      clearInterval(tickIntervalId)
    }
  }, [dispatch]) // `dispatch` from useReducer is stable and won't change.

  // --- Handle Post Action ---
  const handlePost = useCallback(() => {
    dispatch({ type: "POST" })
  }, [dispatch])

  // --- Derived Data for UI ---
  const currentInsanityStage = useMemo(() => {
    const insanityLevelIndex = gameState?.insanityLevelIndex ?? 0
    return INSANITY_STAGES[insanityLevelIndex] || INSANITY_STAGES[0]
  }, [gameState?.insanityLevelIndex])

  if (!gameState) {
    return <div>Loading Game...</div>
  }

  // --- Screen Rendering Logic ---
  const renderScreen = () => {
    switch (currentScreen) {
      case "posting":
        return (
          <Posting
            followers={gameState.followers}
            followersPerClick={gameState.followersPerClick}
            postsMade={gameState.postsMade}
            onPost={handlePost}
          />
        )
      case "monetization":
        return (
          // <MonetizationScreen
          <Monetization
            availableMonetization={availableMonetization}
            onActivateMonetization={handleActivateMonetization}
            currentMoney={gameState.money}
            currentFollowers={gameState.followers}
          />
        )
      case "upgrades":
        return (
          <UpgradesScreen
            availableUpgrades={availableUpgrades}
            onPurchaseUpgrade={handlePurchaseUpgrade}
            currentMoney={gameState.money}
          />
        )
      case "achievements":
        return (
          <Achievements
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
        const _exhaustiveCheck: never = currentScreen
        console.warn("Unknown screen:", _exhaustiveCheck)
        return <p>Unknown Screen</p>
    }
  }

  return (
    <div className="App">
      <h1 style={{ color: vars.color.text }}>Resting</h1>
      <StatusBar
        money={gameState.money}
        followers={gameState.followers}
        currentInsanityStage={currentInsanityStage}
        moneyPerSecond={gameState.moneyPerSecond} // From gameState via reducer
      />
      <NavBar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      <div className="screen-content">{renderScreen()}</div>
      <Footer />
    </div>
  )
}

export default App
