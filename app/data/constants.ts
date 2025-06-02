import { GameState } from "../types"

export const SAVE_KEY = "conspiracyClickerSave"
export const VISUAL_UPDATE_INTERVAL = 50 // 20fps for smooth UI
export const GAME_TICK_INTERVAL = 100 // 10fps for game logic
export const SAVE_INTERVAL = 5000 // Save every 5 seconds
export const DEBOUNCED_SAVE_INTERVAL = 10000 // 10 seconds
export const POST_GENERATION_INTERVAL = 6000 // 6 seconds
export const MAX_AUTO_POST_LEAD = 10 // Allow auto-posts to be at most 10 ahead of manual posts

export const initialGameState: GameState = {
  money: 0,
  followers: 0,
  postsMade: 0,
  insanityLevelIndex: 0,
  followersPerClick: 1,
  passiveFollowersPerSecond: 0,
  baseMoneyPerFollowerPerSecond: 0.001,
  upgrades: [{ id: "faster-typing", level: 0 }],
  monetizationOptions: [],
  unlockedAchievements: [],
  moneyPerSecond: 0,
  lastTick: Date.now(),
  postsFeed: [],
}
