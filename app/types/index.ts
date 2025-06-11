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
  followersPerClickBonus?: number
  passiveFollowersPerSecondBonus?: number
  moneyPerFollowerBonus?: number
  unlocks?: string[]
  postsPerClickBonus?: number
  autoPostsPerSecondBonus?: number
  requirement?: (gameState: GameState) => boolean
}

export interface MonetizationOption {
  id: string
  name: string
  description: string
  costToActivate: number
  followerRequirement: number
  moneyPerSecond: number
  active: boolean
  unlocked: boolean
  requirement?: (gameState: GameState) => boolean
}

export interface UpgradeInstance {
  id: string
  level: number
}

export interface MonetizationInstance {
  id: string
  active: boolean
}

export interface Achievement {
  id: string
  name: string
  description: string
  unlocked: boolean
  condition: (gameState: GameState) => boolean
  reward?: (gameState: GameState) => Partial<GameState>
}

export interface InsanityStage {
  threshold: number
  name: string
  description: string
}

export interface GameState {
  username: string
  money: number
  followers: number
  postsMade: number
  insanityLevelIndex: number
  moneyPerSecond: number
  followersPerClick: number
  passiveFollowersPerSecond: number
  baseMoneyPerFollowerPerSecond: number
  upgrades: UpgradeInstance[]
  monetizationOptions: MonetizationInstance[]
  unlockedAchievements: string[]
  lastTick: number
  postsFeed: GeneratedPost[]
  manualPostsMade: number
  postsPerClick: number
  autoPostsPerSecond: number
  postsGeneratedForFeed: number
}

export interface GameStore {
  gameState: GameState
  visualState: {
    displayedMoney: number
    displayedFollowers: number
  }
  setGameState: (state: GameState) => void
}

export type VerbCategoryType = "acquisition" | "creation" | "control" | "destruction"
export type TargetCategoryType =
  | "locationBad"
  | "locationGood"
  | "thingBad"
  | "thingGood"
  | "abstractGood"
  | "abstractBad"
  | "phenomenon"
  | "mediaGood"
  | "mediaBad"

export interface PostSubject {
  name: string
  plural: boolean
}

export interface PostVerbs {
  type: VerbCategoryType
  verbs: string[]
}

export interface PostTargets {
  type: TargetCategoryType
  targets: string[]
  typename?: "RightClickerPostTargetGroups"
  id?: string
}

export interface PostWithHashTags {
  content: string
  hashtags: string
  engagements: {
    comments: number
    retweets: number
    likes: number
  }
}

export interface GeneratedPost extends PostWithHashTags {
  id: string
  timestamp: number
}
