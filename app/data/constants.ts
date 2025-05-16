import { GameState } from "../types"
// import { INITIAL_ACHIEVEMENTS } from "./achievements"
// import { INITIAL_MONETIZATION_OPTIONS } from "./monetization"
// import { INITIAL_UPGRADES } from "./upgrades"

export const SAVE_KEY = "conspiracyClickerSave"
export const VISUAL_UPDATE_INTERVAL = 50 // 20fps for smooth UI
export const GAME_TICK_INTERVAL = 100 // 10fps for game logic
export const SAVE_INTERVAL = 5000 // Save every 5 seconds

export const initialGameState: GameState = {
  money: 0,
  followers: 0,
  postsMade: 0,
  insanityLevelIndex: 0,
  followersPerClick: 1,
  passiveFollowersPerSecond: 0,
  baseMoneyPerFollowerPerSecond: 0.001,
  upgrades: [{ id: 'faster-typing', level: 0 }],
  monetizationOptions: [],
  unlockedAchievements: [],
  moneyPerSecond: 0,
  lastTick: Date.now(),
}
