"use client"

import { useState, useEffect } from "react"
import "./App.css"
import { useGameSelectors, useGameStore } from "./store/game"
import { ScreenName } from "./types"
import { INSANITY_STAGES } from "./data/insanityLevels"

import NavBar from "./components/NavBar"
import StatusBar from "./components/StatusBar"
import PostingScreen from "./screens/PostingScreen"
import MonetizationScreen from "./screens/MonetizationScreen"
import UpgradesScreen from "./screens/UpgradesScreen"
import AchievementsScreen from "./screens/AchievementsScreen"
import SettingsScreen from "./screens/SettingsScreen"
import {
  SAVE_KEY,
  GAME_TICK_INTERVAL,
  VISUAL_UPDATE_INTERVAL,
  SAVE_INTERVAL,
} from "./data/constants"

function App() {
  const {
    gameState,
    tick,
    handlePost,
    handlePurchaseUpgrade,
    handleActivateMonetization,
    exportGame: handleExportGame,
    importGame: handleImportGame,
    resetGame: handleResetGame,
  } = useGameSelectors()

  const visualTick = useGameStore((state) => state.visualTick)
  const [currentScreen, setCurrentScreen] = useState<ScreenName>("posting")

  useEffect(() => {
    const intervalId = setInterval(tick, GAME_TICK_INTERVAL)
    return () => clearInterval(intervalId)
  }, [tick])

  useEffect(() => {
    const visualIntervalId = setInterval(visualTick, VISUAL_UPDATE_INTERVAL)
    return () => clearInterval(visualIntervalId)
  }, [visualTick])

  // Save game state every 5 seconds
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem(SAVE_KEY, JSON.stringify(gameState))
      }
    }, SAVE_INTERVAL)

    return () => clearTimeout(saveTimeout)
  }, [gameState])

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
          Conspiracy Clicker v0.1 - Remember, it&apos;s just a game... or is it?
        </p>
      </footer>
    </div>
  )
}

export default App
