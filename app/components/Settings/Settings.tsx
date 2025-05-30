import React, { useState } from "react"
import { Button } from "../Button"

import { resetContainer } from "./Settings.css"

interface SettingsScreenProps {
  onExport: () => string
  onImport: (saveData: string) => void
  onReset: () => void
}

export const Settings: React.FC<SettingsScreenProps> = ({ onExport, onImport, onReset }) => {
  const [importData, setImportData] = useState("")
  const [message, setMessage] = useState("")

  const handleExport = () => {
    const data = onExport()
    navigator.clipboard
      .writeText(data)
      .then(() => setMessage("Game data copied to clipboard!"))
      .catch(() => setMessage("Failed to copy. Please copy manually from textarea."))
    setImportData(data)
  }

  const handleImport = () => {
    if (window.confirm("Are you sure you want to import? This will overwrite your current game.")) {
      try {
        onImport(importData)
        setMessage("Game data imported successfully!")
      } catch (error) {
        setMessage("Error importing data. Is it valid?")
        console.error("Import error:", error)
      }
    }
  }

  return (
    <div>
      <h2>Settings</h2>
      <h3>Export Game</h3>
      <Button onClick={handleExport} >
        Export to Clipboard
      </Button>

      <h3>Import Game</h3>
      <textarea
        value={importData}
        onChange={(e) => setImportData(e.target.value)}
        rows={10}
        cols={50}
        placeholder="Paste your game data here"
        style={{
          backgroundColor: "#333",
          color: "#0f0",
          border: "1px solid #0a0",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
      <Button onClick={handleImport} >
        Import from Textarea
      </Button>
      {message && <p>{message}</p>}
      <div className={resetContainer}>
        
      <h3>Reset</h3>
      <Button onClick={onReset}>Reset Game</Button>
      </div>
    </div>
  )
}
