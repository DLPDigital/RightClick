export type ScreenName = "posting" | "monetization" | "upgrades" | "achievements" | "settings"

export interface Upgrade {
  id: string
  name: string
  description: string
  baseCost: number
  costMultiplier: number
  level: number
  maxLevel?: number
  unlocked: boolean
  // Effects (can be specific or generic)
  followersPerClickBonus?: number
  passiveFollowersPerSecondBonus?: number
  moneyPerFollowerBonus?: number // e.g., better conversion from followers to cash
  unlocks?: string[] // IDs of other upgrades/monetizations it unlocks
  requirement?: (gameState: GameState) => boolean // For unlocking
}

export interface MonetizationOption {
  id: string
  name: string
  description: string
  costToActivate: number // One-time cost or follower threshold
  followerRequirement: number
  moneyPerSecond: number
  active: boolean
  unlocked: boolean
  requirement?: (gameState: GameState) => boolean // For unlocking
}

export interface Achievement {
  id: string
  name: string
  description: string
  unlocked: boolean
  condition: (gameState: GameState) => boolean
  reward?: (gameState: GameState) => Partial<GameState> // Optional: give a bonus
}

export interface InsanityStage {
  threshold: number
  name: string
  description: string // Flavor text
}

export interface GameState {
  money: number
  followers: number
  postsMade: number
  insanityLevelIndex: number // Index in the insanityStages array
  moneyPerSecond: number

  // Core rates
  followersPerClick: number
  passiveFollowersPerSecond: number
  baseMoneyPerFollowerPerSecond: number // Base rate before monetization specific bonuses

  upgrades: Record<string, Upgrade>
  monetizationOptions: Record<string, MonetizationOption>
  achievements: Record<string, Achievement>

  lastTick: number
}
