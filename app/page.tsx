"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import "./App.css"
import "./theme/theme.css"

import { ScreenName } from "./types"
import { INSANITY_STAGES } from "./data/insanityLevels"
import { GAME_TICK_INTERVAL } from "./data/constants"
import { INITIAL_ACHIEVEMENTS } from "./data/achievements"

import { useGameEngine, GameEngineHook } from "./hooks/useGameEngine"
import { useGamePersistence, GamePersistenceHook } from "./hooks/useGamePersistence"
import { useUpgrades, UpgradesHook } from "./hooks/useUpgrades"
import { useMonetization, MonetizationHook } from "./hooks/useMonetization"

import { AppContainer } from "./components/AppContainer"
import { IntroModal } from "./components/IntroModal"
import { ComponentContainer } from "./components/ComponentContainer"
import { NavBar } from "./components/NavBar"
import { StatusBar } from "./components/StatusBar"
import { Achievements } from "./components/Achievements"
import { Posting } from "./components/Posting"
import { Monetization } from "./components/Monetization"
import { Upgrades } from "./components/Upgrades"
import { Settings } from "./components/Settings"
import { Footer } from "./components/Footer"
import { useAutoPostGenerator } from "./hooks/useAutoPostGenerator"
import { UsernameSetup } from "./components/UsernameSetup"

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

  // Posting Engine
  const postsFeedLength = Array.isArray(gameState?.postsFeed) ? gameState.postsFeed.length : 0
  useAutoPostGenerator(gameState?.postsMade ?? 0, postsFeedLength, dispatch)

  // --- Game Tick Dispatch ---
  useEffect(() => {
    // console.log("PAGE.TSX: Setting up game tick dispatch interval.")
    const tickIntervalId = setInterval(() => {
      dispatch({ type: "TICK" })
    }, GAME_TICK_INTERVAL)

    return () => {
      // console.log("PAGE.TSX: Clearing game tick dispatch interval.")
      clearInterval(tickIntervalId)
    }
  }, [dispatch]) // `dispatch` from useReducer is stable and won't change.

  // --- Handle Post Action ---
  const handlePost = useCallback(() => {
    dispatch({ type: "POST" })
  }, [dispatch])

  const handleUsernameSet = useCallback(
    (username: string) => {
      dispatch({ type: "SET_USERNAME", payload: { username } })
    },
    [dispatch]
  )

  // --- Derived Data for UI ---
  const currentInsanityStage = useMemo(() => {
    const insanityLevelIndex = gameState?.insanityLevelIndex ?? 0
    return INSANITY_STAGES[insanityLevelIndex] || INSANITY_STAGES[0]
  }, [gameState?.insanityLevelIndex])

  if (!gameState) {
    return <div>Loading Game...</div>
  }

  if (!gameState.username) {
    return <UsernameSetup onUsernameSet={handleUsernameSet} />
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
            postsFeed={gameState.postsFeed}
          />
        )
      case "monetization":
        return (
          <Monetization
            availableMonetization={availableMonetization}
            onActivateMonetization={handleActivateMonetization}
            currentMoney={gameState.money}
            currentFollowers={gameState.followers}
          />
        )
      case "upgrades":
        return (
          <Upgrades
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
          <Settings
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
    <AppContainer>
      <IntroModal />
      <StatusBar
        money={gameState.money}
        followers={gameState.followers}
        currentInsanityStage={currentInsanityStage}
        moneyPerSecond={gameState.moneyPerSecond} // From gameState via reducer
      />
      <NavBar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      <ComponentContainer>{renderScreen()}</ComponentContainer>
      <Footer />
    </AppContainer>
  )
}

export default App
