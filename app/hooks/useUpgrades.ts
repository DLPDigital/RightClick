import { useCallback, useMemo, Dispatch } from "react"
import { GameAction } from "../reducers/gameReducer"
import { AVAILABLE_UPGRADES } from "../data/upgrades"
import { GameState, UpgradeInstance } from "../types"

// Define what an "available" upgrade might look like for the UI
export interface AvailableUpgradeDisplay extends UpgradeInstance {
  name: string
  description: string
  currentCost: number
  maxLevel?: number
  canAfford: boolean
  isMaxLevel: boolean
  // any other UI-relevant properties
}

export interface UpgradesHook {
  availableUpgrades: AvailableUpgradeDisplay[]
  handlePurchaseUpgrade: (id: string) => void
}

export const useUpgrades = (gameState: GameState, dispatch: Dispatch<GameAction>): UpgradesHook => {
  // Memoized function to handle purchasing an upgrade
  const handlePurchaseUpgrade = useCallback(
    (id: string): void => {
      const upgradeData = AVAILABLE_UPGRADES[id]
      if (!upgradeData) {
        console.warn(`UPGRADES_HOOK: Attempted to purchase non-existent upgrade ID: ${id}`)
        return
      }

      const existingUpgrade = gameState.upgrades.find((u) => u.id === id)
      const currentLevel = existingUpgrade?.level ?? 0

      // Check max level (this check also exists in the reducer, but good for UI feedback too)
      if (upgradeData.maxLevel !== undefined && currentLevel >= upgradeData.maxLevel) {
        // console.log(`UPGRADES_HOOK: Upgrade ${id} is already at max level.`);
        // Optionally provide user feedback here if not handled by UI disabling
        return
      }

      const cost = upgradeData.baseCost * Math.pow(upgradeData.costMultiplier, currentLevel)

      // Check affordability (this check also exists in the reducer)
      if (gameState.money < cost) {
        // console.log(`UPGRADES_HOOK: Not enough money to purchase upgrade ${id}.`);
        // Optionally provide user feedback
        return
      }

      // If all checks pass (or to let reducer handle final validation), dispatch the action
      // console.log(`UPGRADES_HOOK: Dispatching PURCHASE_UPGRADE for ID: ${id}`)
      dispatch({ type: "PURCHASE_UPGRADE", payload: { id } })
    },
    [gameState.money, gameState.upgrades, dispatch]
  ) // Dependencies: what the function reads or calls

  // Memoized list of upgrades available for display/purchase
  // This combines static data from AVAILABLE_UPGRADES with dynamic data from gameState
  const availableUpgrades = useMemo((): AvailableUpgradeDisplay[] => {
    // console.log("UPGRADES_HOOK: Recalculating availableUpgrades.")
    // Filter AVAILABLE_UPGRADES to only those that are "unlocked" (present in gameState.upgrades)
    // OR whose requirements are met to be shown.
    // For simplicity, we'll assume `gameState.upgrades` contains all discoverable upgrades (level 0 if not bought).
    // The 'tick' in the reducer is responsible for adding newly discoverable upgrades to gameState.upgrades.

    return gameState.upgrades
      .map((gsUpgrade) => {
        const definition = AVAILABLE_UPGRADES[gsUpgrade.id]
        if (!definition) {
          console.warn(
            `UPGRADES_HOOK: No definition found for upgrade ID in gameState: ${gsUpgrade.id}`
          )
          return null // Or handle this error more gracefully
        }

        const currentLevel = gsUpgrade.level
        const currentCost = definition.baseCost * Math.pow(definition.costMultiplier, currentLevel)
        const isMaxLevel = definition.maxLevel !== undefined && currentLevel >= definition.maxLevel

        return {
          id: gsUpgrade.id,
          level: currentLevel,
          name: definition.name,
          description: definition.description,
          currentCost: currentCost,
          maxLevel: definition.maxLevel,
          canAfford: gameState.money >= currentCost && !isMaxLevel,
          isMaxLevel: isMaxLevel,
        }
      })
      .filter(Boolean) as AvailableUpgradeDisplay[] // Filter out any nulls from missing definitions
  }, [gameState.upgrades, gameState.money]) // Dependencies: when this list should be recomputed

  return {
    availableUpgrades,
    handlePurchaseUpgrade,
  }
}
