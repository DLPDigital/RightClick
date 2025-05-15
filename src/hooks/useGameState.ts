import { useState } from "react"
import { GameState } from "../types"
import { INITIAL_ACHIEVEMENTS } from "../data/achievements"
import { INITIAL_UPGRADES } from "../data/upgrades"
import { INITIAL_MONETIZATION_OPTIONS } from "../data/monetization"

const SAVE_KEY = "conspiracyClickerSave"

export const initialGameState: GameState = {
  money: 0,
  followers: 0,
  postsMade: 0,
  insanityLevelIndex: 0,
  followersPerClick: 1,
  passiveFollowersPerSecond: 0,
  baseMoneyPerFollowerPerSecond: 0.001,
  upgrades: JSON.parse(JSON.stringify(INITIAL_UPGRADES)),
  monetizationOptions: JSON.parse(JSON.stringify(INITIAL_MONETIZATION_OPTIONS)),
  achievements: INITIAL_ACHIEVEMENTS,
  lastTick: Date.now(),
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedGame = localStorage.getItem(SAVE_KEY)
    if (savedGame) {
      try {
        const parsedGame = JSON.parse(savedGame) as GameState
        return {
          ...initialGameState,
          ...parsedGame,
          upgrades: { ...initialGameState.upgrades, ...parsedGame.upgrades },
          monetizationOptions: {
            ...initialGameState.monetizationOptions,
            ...parsedGame.monetizationOptions,
          },
          achievements: Object.keys(parsedGame.achievements).reduce(
            (acc, key) => ({
              ...acc,
              [key]: {
                ...INITIAL_ACHIEVEMENTS[key],
                unlocked: parsedGame.achievements[key].unlocked,
              },
            }),
            INITIAL_ACHIEVEMENTS
          ),
          lastTick: Date.now(),
        }
      } catch (e) {
        console.error("Failed to parse saved game, starting new.", e)
        return { ...initialGameState, lastTick: Date.now() }
      }
    }
    return { ...initialGameState, lastTick: Date.now() }
  })

  return { gameState, setGameState }
}
