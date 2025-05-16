import { create } from "zustand"
import { persist } from "zustand/middleware"
import { GameState } from "../types"
import { initialGameState } from "../data/constants"
import { INSANITY_STAGES } from "../data/insanityLevels"
import { INITIAL_UPGRADES } from "../data/upgrades"
import { INITIAL_MONETIZATION_OPTIONS } from "../data/monetization"
import { INITIAL_ACHIEVEMENTS } from "../data/achievements"

export interface GameStore {
  gameState: GameState
  setGameState: (state: GameState) => void
  calculateRates: (gs: GameState) => {
    calculatedFollowersPerClick: number
    calculatedPassiveFollowersPerSecond: number
    calculatedMoneyPerFollowerPerSecond: number
  }
  tick: () => void
  handlePost: () => void
  handlePurchaseUpgrade: (id: string) => void
  handleActivateMonetization: (id: string) => void
  exportGame: () => string
  importGame: (data: string) => void
  resetGame: () => void
  visualTick: () => void
  visualState: {
    displayedMoney: number
    displayedFollowers: number
  }
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      gameState: initialGameState,
      visualState: {
        displayedMoney: initialGameState.money,
        displayedFollowers: initialGameState.followers,
      },
      setGameState: (newState: GameState) => set({ gameState: newState }),
      calculateRates: (gs: GameState) => {
        let followersPerClick = 1
        let passiveFollowersPerSecond = 0
        let moneyPerFollowerBonusTotal = 0

        // Add safety check to ensure upgrades is an array
        const upgrades = Array.isArray(gs.upgrades) ? gs.upgrades : []

        upgrades.forEach(({ id, level }) => {
          const upgrade = INITIAL_UPGRADES[id]
          if (level > 0) {
            if (upgrade.followersPerClickBonus) {
              followersPerClick += upgrade.followersPerClickBonus * level
            }
            if (upgrade.passiveFollowersPerSecondBonus) {
              passiveFollowersPerSecond += upgrade.passiveFollowersPerSecondBonus * level
            }
            if (upgrade.moneyPerFollowerBonus) {
              moneyPerFollowerBonusTotal += upgrade.moneyPerFollowerBonus * level
            }
          }
        })

        return {
          calculatedFollowersPerClick: followersPerClick,
          calculatedPassiveFollowersPerSecond: passiveFollowersPerSecond,
          calculatedMoneyPerFollowerPerSecond:
            gs.baseMoneyPerFollowerPerSecond * (1 + moneyPerFollowerBonusTotal),
        }
      },
      tick: () => {
        set((state) => {
          const now = Date.now()
          const deltaSeconds = (now - state.gameState.lastTick) / 1000
          const rates = get().calculateRates(state.gameState)

          // Calculate new followers
          const newFollowers =
            state.gameState.followers + rates.calculatedPassiveFollowersPerSecond * deltaSeconds

          // Calculate money from followers
          const moneyFromFollowers =
            newFollowers * rates.calculatedMoneyPerFollowerPerSecond * deltaSeconds

          // Calculate money from monetization options
          let moneyFromMonetization = 0
          state.gameState.monetizationOptions.forEach((opt) => {
            if (opt.active) {
              const monetizationData = INITIAL_MONETIZATION_OPTIONS[opt.id]
              if (monetizationData) {
                moneyFromMonetization += monetizationData.moneyPerSecond * deltaSeconds
              }
            }
          })

          // Calculate total new money
          const newMoney = state.gameState.money + moneyFromFollowers + moneyFromMonetization

          // Calculate money per second (base rates without multiplication)
          const totalMoneyPerSecond =
            state.gameState.followers * rates.calculatedMoneyPerFollowerPerSecond +
            state.gameState.monetizationOptions
              .filter((opt) => opt.active)
              .reduce((sum, opt) => {
                const monetizationData = INITIAL_MONETIZATION_OPTIONS[opt.id]
                return sum + (monetizationData?.moneyPerSecond || 0)
              }, 0)

          let newInsanityIndex = state.gameState.insanityLevelIndex
          for (let i = INSANITY_STAGES.length - 1; i >= 0; i--) {
            if (state.gameState.postsMade >= INSANITY_STAGES[i].threshold && i > newInsanityIndex) {
              newInsanityIndex = i
              break
            }
          }

          const nextState: GameState = {
            ...state.gameState,
            money: newMoney,
            followers: newFollowers,
            moneyPerSecond: totalMoneyPerSecond,
            insanityLevelIndex: newInsanityIndex,
            followersPerClick: rates.calculatedFollowersPerClick,
            passiveFollowersPerSecond: rates.calculatedPassiveFollowersPerSecond,
            lastTick: now,
          }
          // Check for new upgrades, monetization options, and achievements
          Object.entries(INITIAL_UPGRADES).forEach(([id, upgradeData]) => {
            const hasUpgrade = nextState.upgrades.some((u) => u.id === id)
            if (!hasUpgrade && upgradeData.requirement && upgradeData.requirement(nextState)) {
              nextState.upgrades.push({ id, level: 0 })
            }
          })

          // Check for new monetization options
          Object.entries(INITIAL_MONETIZATION_OPTIONS).forEach(([id, monetizationData]) => {
            const hasOption = nextState.monetizationOptions.some((m) => m.id === id)
            if (
              !hasOption &&
              monetizationData.requirement &&
              monetizationData.requirement(nextState)
            ) {
              nextState.monetizationOptions.push({ id, active: false })
            }
          })

          nextState.unlockedAchievements.forEach((id) => {
            const achievement = INITIAL_ACHIEVEMENTS[id]
            if (achievement?.condition && !nextState.unlockedAchievements.includes(id)) {
              try {
                if (achievement.condition(nextState)) {
                  nextState.unlockedAchievements.push(id)
                  console.log(`Achievement Unlocked: ${achievement.name}`)
                  if (achievement.reward) {
                    const rewardChanges = achievement.reward(nextState)
                    Object.assign(nextState, rewardChanges)
                  }
                }
              } catch (e) {
                console.error(`Error checking achievement ${id}:`, e)
              }
            }
          })

          return { gameState: nextState }
        })
      },
      handlePost: () => {
        set((state) => ({
          gameState: {
            ...state.gameState,
            followers: state.gameState.followers + state.gameState.followersPerClick,
            postsMade: state.gameState.postsMade + 1,
          },
        }))
      },

      handlePurchaseUpgrade: (id: string) => {
        set((state) => {
          const upgradeData = INITIAL_UPGRADES[id]
          const existingUpgrade = state.gameState.upgrades.find((u) => u.id === id)
          const currentLevel = existingUpgrade?.level ?? 0

          if (
            !upgradeData ||
            (upgradeData.maxLevel !== undefined && currentLevel >= upgradeData.maxLevel)
          ) {
            return state
          }

          const cost = upgradeData.baseCost * Math.pow(upgradeData.costMultiplier, currentLevel)
          if (state.gameState.money >= cost) {
            const newUpgrades = state.gameState.upgrades.filter((u) => u.id !== id)
            newUpgrades.push({ id, level: currentLevel + 1 })

            // Handle unlocks if needed
            if (upgradeData.unlocks) {
              upgradeData.unlocks.forEach((unlockId) => {
                if (!newUpgrades.some((u) => u.id === unlockId)) {
                  newUpgrades.push({ id: unlockId, level: 0 })
                }
              })
            }

            const newState = {
              ...state.gameState,
              money: state.gameState.money - cost,
              upgrades: newUpgrades,
            }

            const rates = get().calculateRates(newState)

            return {
              gameState: {
                ...newState,
                followersPerClick: rates.calculatedFollowersPerClick,
                passiveFollowersPerSecond: rates.calculatedPassiveFollowersPerSecond,
              },
            }
          }
          return state
        })
      },

      handleActivateMonetization: (id: string) => {
        set((state) => {
          const monetizationData = INITIAL_MONETIZATION_OPTIONS[id]
          const existingOption = state.gameState.monetizationOptions.find((m) => m.id === id)

          if (!monetizationData || (existingOption && existingOption.active)) return state

          if (
            state.gameState.money >= monetizationData.costToActivate &&
            state.gameState.followers >= monetizationData.followerRequirement
          ) {
            const newMonetizationOptions = state.gameState.monetizationOptions.filter(
              (m) => m.id !== id
            )
            newMonetizationOptions.push({ id, active: true })

            return {
              gameState: {
                ...state.gameState,
                money: state.gameState.money - monetizationData.costToActivate,
                monetizationOptions: newMonetizationOptions,
              },
            }
          }
          return state
        })
      },
      exportGame: () => {
        return JSON.stringify(get().gameState)
      },

      importGame: (data: string) => {
        try {
          const importedState = JSON.parse(data) as GameState
          // Basic validation
          if (
            typeof importedState.money !== "number" ||
            typeof importedState.followers !== "number" ||
            !Array.isArray(importedState.upgrades) ||
            !Array.isArray(importedState.monetizationOptions) ||
            !Array.isArray(importedState.unlockedAchievements)
          ) {
            throw new Error("Invalid save data structure.")
          }

          set({
            gameState: {
              ...initialGameState,
              ...importedState,
              // Ensure arrays are properly copied
              upgrades: [...importedState.upgrades],
              monetizationOptions: [...importedState.monetizationOptions],
              unlockedAchievements: [...importedState.unlockedAchievements],
              lastTick: Date.now(),
            },
          })
        } catch (e) {
          console.error("Import failed:", e)
          throw e
        }
      },

      resetGame: () => {
        if (
          typeof window !== "undefined" &&
          window.confirm("Are you sure you want to reset your game?")
        ) {
          set({
            gameState: {
              ...initialGameState,
              upgrades: [...initialGameState.upgrades],
              monetizationOptions: [...initialGameState.monetizationOptions],
              unlockedAchievements: [...initialGameState.unlockedAchievements],
              lastTick: Date.now(),
            },
          })
          localStorage.removeItem("conspiracy-clicker-storage")
        }
      },
      visualTick: () => {
        set((state) => {
          const target = state.gameState
          const current = state.visualState

          // Only interpolate if difference is significant
          const shouldInterpolate =
            Math.abs(target.money - current.displayedMoney) > 100 ||
            Math.abs(target.followers - current.displayedFollowers) > 100

          if (!shouldInterpolate) {
            return {
              visualState: {
                displayedMoney: target.money,
                displayedFollowers: target.followers,
              },
            }
          }

          // Add lerp helper function if not defined elsewhere
          const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor
          }

          return {
            visualState: {
              displayedMoney: lerp(current.displayedMoney, target.money, 0.3),
              displayedFollowers: lerp(current.displayedFollowers, target.followers, 0.3),
            },
          }
        })
      },
    }),
    {
      name: "conspiracy-clicker-storage",
      partialize: (state) => ({
        gameState: state.gameState,
      }),
    }
  )
)

export const useGameSelectors = () => {
  return {
    gameState: useGameStore((state) => state.gameState),
    tick: useGameStore((state) => state.tick),
    handlePost: useGameStore((state) => state.handlePost),
    handlePurchaseUpgrade: useGameStore((state) => state.handlePurchaseUpgrade),
    handleActivateMonetization: useGameStore((state) => state.handleActivateMonetization),
    exportGame: useGameStore((state) => state.exportGame),
    importGame: useGameStore((state) => state.importGame),
    resetGame: useGameStore((state) => state.resetGame),
  }
}
