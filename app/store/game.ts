import { create } from "zustand"
import { persist } from "zustand/middleware"
import { GameState } from "../types"
import { initialGameState } from "../data/constants"
import { INSANITY_STAGES } from "../data/insanityLevels"

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
        let passiveFollowersPerSecond = 0 // passive followers per second
        let moneyPerFollowerBonusTotal = 0
        Object.values(gs.upgrades).forEach((upg) => {
          if (upg.level > 0) {
            if (upg.followersPerClickBonus)
              followersPerClick += upg.followersPerClickBonus * upg.level
            if (upg.passiveFollowersPerSecondBonus)
              passiveFollowersPerSecond += upg.passiveFollowersPerSecondBonus * upg.level
            if (upg.moneyPerFollowerBonus)
              moneyPerFollowerBonusTotal += upg.moneyPerFollowerBonus * upg.level
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
          Object.values(state.gameState.monetizationOptions).forEach((opt) => {
            if (opt.active) {
              moneyFromMonetization += opt.moneyPerSecond * deltaSeconds
            }
          })

          // Calculate total new money
          const newMoney = state.gameState.money + moneyFromFollowers + moneyFromMonetization

          // Calculate money per second (base rates without multiplication)
          const totalMoneyPerSecond =
            state.gameState.followers * rates.calculatedMoneyPerFollowerPerSecond +
            Object.values(state.gameState.monetizationOptions).reduce(
              (sum, opt) => sum + (opt.active ? opt.moneyPerSecond : 0),
              0
            )

          let newInsanityIndex = state.gameState.insanityLevelIndex
          for (let i = INSANITY_STAGES.length - 1; i >= 0; i--) {
            if (state.gameState.postsMade >= INSANITY_STAGES[i].threshold && i > newInsanityIndex) {
              newInsanityIndex = i
              break
            }
          }
          console.log("totalMoneyPerSecond", totalMoneyPerSecond)
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
          Object.keys(nextState.upgrades).forEach((key) => {
            const upg = nextState.upgrades[key]
            if (!upg.unlocked && upg.requirement && upg.requirement(nextState)) {
              nextState.upgrades[key] = { ...upg, unlocked: true }
            }
          })

          Object.keys(nextState.monetizationOptions).forEach((key) => {
            const opt = nextState.monetizationOptions[key]
            if (!opt.unlocked && opt.requirement && opt.requirement(nextState)) {
              nextState.monetizationOptions[key] = { ...opt, unlocked: true }
            }
          })

          Object.keys(nextState.achievements).forEach((key) => {
            const ach = nextState.achievements[key]
            if (!ach.unlocked && ach.condition && typeof ach.condition === "function") {
              try {
                if (ach.condition(nextState)) {
                  nextState.achievements[key] = { ...ach, unlocked: true }
                  console.log(`Achievement Unlocked: ${ach.name}`)
                  if (ach.reward && typeof ach.reward === "function") {
                    const rewardChanges = ach.reward(nextState)
                    Object.assign(nextState, rewardChanges)
                  }
                }
              } catch (e) {
                console.error(`Error checking achievement ${key}:`, e)
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
          const upgrade = state.gameState.upgrades[id]
          if (!upgrade || (upgrade.maxLevel !== undefined && upgrade.level >= upgrade.maxLevel)) {
            return state
          }

          const cost = upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.level)
          if (state.gameState.money >= cost) {
            const newUpgrades = {
              ...state.gameState.upgrades,
              [id]: { ...upgrade, level: upgrade.level + 1 },
            }

            if (upgrade.unlocks) {
              upgrade.unlocks.forEach((unlockId) => {
                if (newUpgrades[unlockId] && !newUpgrades[unlockId].unlocked) {
                  newUpgrades[unlockId] = { ...newUpgrades[unlockId], unlocked: true }
                }
              })
            }

            const rates = get().calculateRates({ ...state.gameState, upgrades: newUpgrades })

            return {
              gameState: {
                ...state.gameState,
                money: state.gameState.money - cost,
                upgrades: newUpgrades,
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
          const option = state.gameState.monetizationOptions[id]
          if (!option || option.active) return state

          if (
            state.gameState.money >= option.costToActivate &&
            state.gameState.followers >= option.followerRequirement
          ) {
            return {
              gameState: {
                ...state.gameState,
                money: state.gameState.money - option.costToActivate,
                monetizationOptions: {
                  ...state.gameState.monetizationOptions,
                  [id]: { ...option, active: true },
                },
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
            typeof importedState.followers !== "number"
          ) {
            throw new Error("Invalid save data structure.")
          }
          const importedMoneyPerSecond = importedState.moneyPerSecond || 0
          set({
            gameState: {
              ...initialGameState,
              ...importedState,
              moneyPerSecond: importedMoneyPerSecond ?? 0,
              upgrades: { ...initialGameState.upgrades, ...importedState.upgrades },
              monetizationOptions: {
                ...initialGameState.monetizationOptions,
                ...importedState.monetizationOptions,
              },
              achievements: { ...initialGameState.achievements, ...importedState.achievements },
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
          set({ gameState: { ...initialGameState, lastTick: Date.now() } })
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
