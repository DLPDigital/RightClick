"use client"

import { useState, useEffect } from "react"
import "./App.css"
import { useGameStore } from "./store/game"
import { ScreenName } from "./types"
import { INSANITY_STAGES } from "./data/insanityLevels"

import NavBar from "./components/NavBar"
import StatusBar from "./components/StatusBar"
import PostingScreen from "./screens/PostingScreen"
import MonetizationScreen from "./screens/MonetizationScreen"
import UpgradesScreen from "./screens/UpgradesScreen"
import AchievementsScreen from "./screens/AchievementsScreen"
import SettingsScreen from "./screens/SettingsScreen"
import { SAVE_KEY, TICK_INTERVAL } from "./data/constants"

function App() {
  const gameState = useGameStore((state) => state.gameState)
  const tick = useGameStore((state) => state.tick)
  const handlePost = useGameStore((state) => state.handlePost)
  const handlePurchaseUpgrade = useGameStore((state) => state.handlePurchaseUpgrade)
  const handleActivateMonetization = useGameStore((state) => state.handleActivateMonetization)
  const handleExportGame = useGameStore((state) => state.exportGame)
  const handleImportGame = useGameStore((state) => state.importGame)
  const handleResetGame = useGameStore((state) => state.resetGame)

  const [currentScreen, setCurrentScreen] = useState<ScreenName>("posting")

  useEffect(() => {
    const intervalId = setInterval(tick, TICK_INTERVAL)
    return () => clearInterval(intervalId)
  }, [tick])

  // Save game state whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SAVE_KEY, JSON.stringify(gameState))
    }
  }, [gameState])

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
