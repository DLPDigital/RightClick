// src/hooks/useGameEngine.ts

import { useReducer, useEffect, useRef, Dispatch } from "react"
import { GameAction, gameReducer } from "../reducers/gameReducer" // Import from your reducer file
import { initialGameState } from "../data/constants" // For initial state
import { SAVE_KEY } from "../data/constants" // For loading
import { GameState } from "../types"

// Initializer function for useReducer to load state from localStorage
// This function is run ONCE by useReducer when the hook first mounts.
const initGameStateFromStorage = (initialState: GameState): GameState => {
  console.log("ENGINE_HOOK: initGameStateFromStorage called by useReducer.")
  if (typeof window !== "undefined") {
    const savedGame = localStorage.getItem(SAVE_KEY)
    if (savedGame) {
      try {
        const parsedState = JSON.parse(savedGame)
        // Perform validation (same as in your page.tsx useState initializer)
        if (
          parsedState &&
          typeof parsedState.money === "number" &&
          typeof parsedState.followers === "number" &&
          Array.isArray(parsedState.upgrades) &&
          Array.isArray(parsedState.monetizationOptions) &&
          Array.isArray(parsedState.unlockedAchievements) &&
          typeof parsedState.lastTick === "number"
        ) {
          console.log("ENGINE_HOOK: Valid saved game found, loading it.")
          return {
            ...initialState, // Base defaults
            ...parsedState, // Override with saved values
            // Ensure arrays are new instances
            upgrades: [...parsedState.upgrades],
            monetizationOptions: [...parsedState.monetizationOptions],
            unlockedAchievements: [...parsedState.unlockedAchievements],
            lastTick: Date.now(), // Always update lastTick on load
          }
        } else {
          console.warn("ENGINE_HOOK: Saved game data invalid. Using default initial state.")
        }
      } catch (e) {
        console.error("ENGINE_HOOK: Failed to parse saved game. Using default initial state:", e)
      }
    } else {
      console.log("ENGINE_HOOK: No saved game found. Using default initial state.")
    }
  }
  // Fallback to a fresh copy of initialGameState
  return {
    ...initialState,
    upgrades: [...initialState.upgrades],
    monetizationOptions: [...initialState.monetizationOptions],
    unlockedAchievements: [...initialState.unlockedAchievements],
    lastTick: Date.now(),
  }
}

export interface GameEngineHook {
  gameState: GameState
  dispatch: Dispatch<GameAction>
  gameStateRef: React.MutableRefObject<GameState> // For persistence hook
}

export const useGameEngine = (): GameEngineHook => {
  // useReducer takes the reducer function, the initial state (or an initializer function's argument),
  // and an optional third argument: an initializer function.
  // The initializer function (initGameStateFromStorage) is called ONCE to compute the initial state.
  const [gameState, dispatch] = useReducer(
    gameReducer,
    initialGameState, // This is passed as the argument to initGameStateFromStorage
    initGameStateFromStorage
  )

  // Create a ref to hold the latest gameState.
  // This is useful for things like the save interval, which might otherwise close over a stale gameState.
  const gameStateRef = useRef(gameState)

  // useEffect to keep the gameStateRef updated whenever gameState changes.
  useEffect(() => {
    // console.log("ENGINE_HOOK: gameStateRef updated. Posts:", gameState.postsMade);
    gameStateRef.current = gameState
  }, [gameState])

  console.log("ENGINE_HOOK: useGameEngine hook executed/re-rendered. Posts:", gameState.postsMade)

  return {
    gameState,
    dispatch,
    gameStateRef, // Expose the ref
  }
}
