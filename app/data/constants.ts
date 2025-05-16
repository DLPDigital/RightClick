import { GameState } from "../types"
import { INITIAL_ACHIEVEMENTS } from "./achievements"
import { INITIAL_MONETIZATION_OPTIONS } from "./monetization"
import { INITIAL_UPGRADES } from "./upgrades"

export const SAVE_KEY = "conspiracyClickerSave"
export const TICK_INTERVAL = 100

export const initialGameState: GameState = {
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