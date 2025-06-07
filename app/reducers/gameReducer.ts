import { GameState, UpgradeInstance, MonetizationInstance, GeneratedPost } from "../types" // Import necessary types
import { initialGameState } from "../data/constants" // For reset and potentially initial load
import { AVAILABLE_UPGRADES } from "../data/upgrades"
import { INITIAL_MONETIZATION_OPTIONS } from "../data/monetization"
import { INITIAL_ACHIEVEMENTS } from "../data/achievements"
import { INSANITY_STAGES } from "../data/insanityLevels"
import { calculateRates } from "../utils/calculateRates" // We'll need this utility

// --- Action Types ---
// Define all possible actions that can modify the game state.
// Using a discriminated union for actions is a best practice with TypeScript.
export type GameAction =
  | { type: "TICK" }
  | { type: "POST" }
  | { type: "PURCHASE_UPGRADE"; payload: { id: string } }
  | { type: "ACTIVATE_MONETIZATION"; payload: { id: string } }
  | { type: "LOAD_GAME"; payload: GameState }
  | { type: "RESET_GAME" }
  | { type: "EXPORT_GAME_REQUEST" } // For persistence, though export itself doesn't change state here
  | { type: "ADD_TO_POST_FEED"; payload: GeneratedPost }
  | { type: "SET_USERNAME"; payload: { username: string } }

// --- Reducer Function ---
export const gameReducer = (state: GameState, action: GameAction): GameState => {
  // console.log(`REDUCER: Action dispatched - ${action.type}`, action.type !== "TICK" ? action : "") // Log actions (verbose for TICK)

  switch (action.type) {
    case "TICK": {
      const now = Date.now()
      const deltaSeconds = (now - state.lastTick) / 1000
      // Cap offline progress to avoid excessively large calculations if game was closed for a long time
      const cappedDeltaSeconds = Math.min(deltaSeconds, 300) // e.g., 5 minutes max catch-up

      const rates = calculateRates(state)

      const currentFollowers = state.followers
      const passiveFollowersEarned = rates.calculatedPassiveFollowersPerSecond * cappedDeltaSeconds
      const newFollowers = currentFollowers + passiveFollowersEarned

      const moneyFromFollowers =
        newFollowers * rates.calculatedMoneyPerFollowerPerSecond * cappedDeltaSeconds

      let moneyFromMonetization = 0
      const currentMonetizationOptions = Array.isArray(state.monetizationOptions)
        ? state.monetizationOptions
        : []
      currentMonetizationOptions.forEach((opt) => {
        if (opt.active) {
          const monetizationData = INITIAL_MONETIZATION_OPTIONS[opt.id]
          if (monetizationData) {
            moneyFromMonetization += monetizationData.moneyPerSecond * cappedDeltaSeconds
          }
        }
      })
      const newMoney = state.money + moneyFromFollowers + moneyFromMonetization

      const moneyPerSecondFromFollowers =
        currentFollowers * rates.calculatedMoneyPerFollowerPerSecond
      const moneyPerSecondFromMonetization = currentMonetizationOptions
        .filter((opt) => opt.active)
        .reduce((sum, opt) => {
          const monetizationData = INITIAL_MONETIZATION_OPTIONS[opt.id]
          return sum + (monetizationData?.moneyPerSecond || 0)
        }, 0)
      const totalMoneyPerSecond = moneyPerSecondFromFollowers + moneyPerSecondFromMonetization

      let newInsanityIndex = state.insanityLevelIndex
      for (let i = INSANITY_STAGES.length - 1; i >= 0; i--) {
        if (state.postsMade >= INSANITY_STAGES[i].threshold && i > newInsanityIndex) {
          newInsanityIndex = i
          break
        }
      }

      // Create a mutable next state object based on the current state
      let nextState: GameState = {
        ...state, // Start with a copy of the current state
        money: newMoney,
        followers: newFollowers,
        moneyPerSecond: totalMoneyPerSecond,
        insanityLevelIndex: newInsanityIndex,
        followersPerClick: rates.calculatedFollowersPerClick,
        passiveFollowersPerSecond: rates.calculatedPassiveFollowersPerSecond,
        lastTick: now,
        // Ensure arrays are copied for modification below
        upgrades: [...state.upgrades],
        monetizationOptions: [...currentMonetizationOptions],
        unlockedAchievements: [...state.unlockedAchievements],
      }

      // Unlockables (Upgrades)
      const newlyUnlockedUpgrades: UpgradeInstance[] = []
      Object.entries(AVAILABLE_UPGRADES).forEach(([id, upgradeData]) => {
        if (
          !nextState.upgrades.some((u) => u.id === id) &&
          upgradeData.requirement &&
          upgradeData.requirement(nextState)
        ) {
          newlyUnlockedUpgrades.push({ id, level: 0 })
        }
      })
      if (newlyUnlockedUpgrades.length > 0) {
        nextState.upgrades = [...nextState.upgrades, ...newlyUnlockedUpgrades]
      }

      // Unlockables (Monetization)
      const newlyUnlockedMonetization: MonetizationInstance[] = []
      Object.entries(INITIAL_MONETIZATION_OPTIONS).forEach(([id, monetizationData]) => {
        if (
          !nextState.monetizationOptions.some((m) => m.id === id) &&
          monetizationData.requirement &&
          monetizationData.requirement(nextState)
        ) {
          newlyUnlockedMonetization.push({ id, active: false })
        }
      })
      if (newlyUnlockedMonetization.length > 0) {
        nextState.monetizationOptions = [
          ...nextState.monetizationOptions,
          ...newlyUnlockedMonetization,
        ]
      }

      // Unlockables (Achievements)
      const newlyUnlockedAchievementIds: string[] = []
      Object.entries(INITIAL_ACHIEVEMENTS).forEach(([id, achievementDef]) => {
        if (!nextState.unlockedAchievements.includes(id) && achievementDef.condition(nextState)) {
          newlyUnlockedAchievementIds.push(id)
          if (achievementDef.reward) {
            // Apply reward if defined
            const rewards = achievementDef.reward(nextState)
            nextState = { ...nextState, ...rewards } // Merge rewards into the evolving nextState
          }
        }
      })
      if (newlyUnlockedAchievementIds.length > 0) {
        nextState.unlockedAchievements = [
          ...nextState.unlockedAchievements,
          ...newlyUnlockedAchievementIds,
        ]
      }

      return nextState // Return the fully updated new state
    }

    case "POST": {
      return {
        ...state,
        followers: state.followers + state.followersPerClick,
        postsMade: state.postsMade + 1,
      }
    }

    case "PURCHASE_UPGRADE": {
      const { id } = action.payload
      const upgradeData = AVAILABLE_UPGRADES[id]
      const existingUpgrade = state.upgrades.find((u) => u.id === id)
      const currentLevel = existingUpgrade?.level ?? 0

      if (
        !upgradeData ||
        (upgradeData.maxLevel !== undefined && currentLevel >= upgradeData.maxLevel)
      ) {
        return state // No change if upgrade doesn't exist or max level reached
      }

      const cost = upgradeData.baseCost * Math.pow(upgradeData.costMultiplier, currentLevel)
      if (state.money >= cost) {
        const newUpgrades = state.upgrades.map((u) =>
          u.id === id ? { ...u, level: u.level + 1 } : u
        )
        // If it was just unlocked and not in `state.upgrades` yet, this won't add it.
        // The `TICK` logic should add level 0 upgrades. This case assumes it exists.
        if (!newUpgrades.find((u) => u.id === id) && existingUpgrade) {
          console.warn(
            "PURCHASE_UPGRADE: Upgrade was findable but not in mapped array. This is unusual."
          )
        }

        // Create an intermediate state to recalculate rates
        const stateAfterPurchase: GameState = {
          ...state,
          money: state.money - cost,
          upgrades: newUpgrades,
        }
        const rates = calculateRates(stateAfterPurchase) // Recalculate rates
        return {
          ...stateAfterPurchase,
          followersPerClick: rates.calculatedFollowersPerClick,
          passiveFollowersPerSecond: rates.calculatedPassiveFollowersPerSecond,
        }
      }
      return state // Not enough money, no change
    }

    case "ACTIVATE_MONETIZATION": {
      const { id } = action.payload
      const monetizationData = INITIAL_MONETIZATION_OPTIONS[id]
      const currentMonetizationOptions = Array.isArray(state.monetizationOptions)
        ? state.monetizationOptions
        : []
      const existingOption = currentMonetizationOptions.find((m) => m.id === id)

      if (!monetizationData || (existingOption && existingOption.active)) {
        return state // No change
      }

      if (
        state.money >= monetizationData.costToActivate &&
        state.followers >= monetizationData.followerRequirement
      ) {
        const newMonetizationOptions = currentMonetizationOptions.map((m) =>
          m.id === id ? { ...m, active: true } : m
        )
        // If it was just unlocked and not in `state.monetizationOptions` yet, this won't add it.
        // The `TICK` logic should add it. This case assumes it exists.
        if (!newMonetizationOptions.find((m) => m.id === id) && existingOption) {
          console.warn(
            "ACTIVATE_MONETIZATION: Option was findable but not in mapped array. This is unusual."
          )
        }

        return {
          ...state,
          money: state.money - monetizationData.costToActivate,
          monetizationOptions: newMonetizationOptions,
        }
      }
      return state // Conditions not met, no change
    }

    case "SET_USERNAME": {
      console.log("REDUCER: Setting username to", action.payload.username)
      return {
        ...state,
        username: action.payload.username.trim(), // Trim whitespace
      }
    }

    case "LOAD_GAME": {
      // The payload IS the new GameState, but we should ensure lastTick is current.
      // The validation of the loaded state structure should happen BEFORE dispatching this action.
      const loadedUsername = action.payload.username || initialGameState.username || ""
      return {
        ...action.payload,
        username: loadedUsername,
        lastTick: Date.now(), // Always reset lastTick on load
      }
    }

    case "RESET_GAME": {
      // Return a fresh copy of the initial game state
      return {
        ...initialGameState,
        upgrades: initialGameState.upgrades.map((u) => ({ ...u })), // Deep copy arrays of objects
        monetizationOptions: initialGameState.monetizationOptions.map((m) => ({ ...m })),
        unlockedAchievements: [...initialGameState.unlockedAchievements],
        lastTick: Date.now(),
      }
    }

    case "ADD_TO_POST_FEED": {
      const newFeed = [action.payload, ...state.postsFeed]
      // const MAX_FEED_ITEMS = 50
      const MAX_FEED_ITEMS = 10
      if (newFeed.length > MAX_FEED_ITEMS) {
        newFeed.length = MAX_FEED_ITEMS
      }
      return {
        ...state,
        postsFeed: newFeed,
      }
    }

    default:
      // For exhaustiveness checking with TypeScript, you can use:
      // const _exhaustiveCheck: never = action;
      // return state;
      // Or simply:
      console.warn("REDUCER: Unknown action type", action)
      return state
  }
}
