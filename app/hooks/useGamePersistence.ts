import { useEffect, useCallback, Dispatch } from "react"
import { GameAction } from "../reducers/gameReducer"
import { SAVE_KEY, DEBOUNCED_SAVE_INTERVAL } from "../data/constants"
import { GameState } from "../types"

export interface GamePersistenceHook {
  handleExportGame: () => string
  handleImportGame: (data: string) => void
  handleResetGame: () => void
}

export const useGamePersistence = (
  gameStateRef: React.MutableRefObject<GameState>, // To get the latest state for saving
  dispatch: Dispatch<GameAction> // To dispatch actions like LOAD_GAME or RESET_GAME
): GamePersistenceHook => {
  // --- Periodic Save Logic ---
  useEffect(() => {
    console.log("PERSISTENCE_HOOK: Setting up periodic save interval.")

    const saveIntervalId = setInterval(() => {
      if (typeof window !== "undefined") {
        const currentStateToSave = gameStateRef.current // Get latest state from ref
        if (currentStateToSave) {
          // Ensure ref is populated
          console.log(
            `PERSISTENCE_HOOK: --- PERIODIC SAVE --- Saving. Posts: ${currentStateToSave.postsMade}, Money: ${currentStateToSave.money.toFixed(0)}`
          )
          localStorage.setItem(SAVE_KEY, JSON.stringify(currentStateToSave))
        } else {
          console.warn(
            "PERSISTENCE_HOOK: gameStateRef.current is null/undefined during save attempt. Skipping save."
          )
        }
      }
    }, DEBOUNCED_SAVE_INTERVAL) // Use the constant for the interval

    return () => {
      console.log("PERSISTENCE_HOOK: Clearing periodic save interval.")
      clearInterval(saveIntervalId)
    }
  }, [gameStateRef]) // Only re-run if gameStateRef itself changes (which it won't after initial assignment)
  // The ref's .current property changing doesn't trigger useEffects.
  // This empty-like dependency array is correct for setting up an interval once.

  // --- Export Game Function ---
  const handleExportGame = useCallback((): string => {
    console.log("PERSISTENCE_HOOK: Exporting game state.")
    // Export the latest state directly from the ref
    return JSON.stringify(gameStateRef.current)
  }, [gameStateRef]) // Depends on gameStateRef (stable)

  // --- Import Game Function ---
  const handleImportGame = useCallback(
    (data: string): void => {
      console.log("PERSISTENCE_HOOK: Attempting to import game.")
      try {
        const importedState = JSON.parse(data) as GameState // Type assertion

        // Basic validation of the imported state structure
        // (More robust validation with a schema library like Zod would be even better for complex states)
        if (
          typeof importedState.money !== "number" ||
          typeof importedState.followers !== "number" ||
          !Array.isArray(importedState.upgrades) ||
          !Array.isArray(importedState.monetizationOptions) ||
          !Array.isArray(importedState.unlockedAchievements) ||
          typeof importedState.lastTick !== "number" // Ensure lastTick is part of the save
        ) {
          throw new Error("Invalid save data structure during import.")
        }

        // If valid, dispatch the LOAD_GAME action with the validated payload
        dispatch({ type: "LOAD_GAME", payload: importedState })
        alert("Game imported successfully!")
        console.log("PERSISTENCE_HOOK: Game import successful, dispatched LOAD_GAME.")
      } catch (e) {
        console.error("PERSISTENCE_HOOK: Import failed:", e)
        alert("Failed to import game data. It might be corrupted.")
      }
    },
    [dispatch]
  ) // Depends on dispatch (stable)

  // --- Reset Game Function ---
  const handleResetGame = useCallback((): void => {
    if (
      typeof window !== "undefined" &&
      window.confirm(
        "Are you sure you want to reset your game? This will erase your saved progress."
      )
    ) {
      console.log("PERSISTENCE_HOOK: Resetting game.")
      // Dispatch the RESET_GAME action
      dispatch({ type: "RESET_GAME" })
      // Also clear the localStorage save
      localStorage.removeItem(SAVE_KEY)
      alert("Game has been reset.")
    }
  }, [dispatch]) // Depends on dispatch (stable)

  return {
    handleExportGame,
    handleImportGame,
    handleResetGame,
  }
}
