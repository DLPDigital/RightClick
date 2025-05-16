import { create } from "zustand"
import { persist } from "zustand/middleware"
import { GameState } from "../types"
import { initialGameState } from "../data/constants"
import { INSANITY_STAGES } from "../data/insanityLevels"

interface GameStore {
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
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      gameState: initialGameState,
      setGameState: (newState: GameState) => set({ gameState: newState }),

      // Move the calculation logic into the store
      calculateRates: (gs: GameState) => {
        let fpc = 1
        let pfps = 0
        let moneyPerFollowerBonusTotal = 0

        Object.values(gs.upgrades).forEach((upg) => {
          if (upg.level > 0) {
            if (upg.followersPerClickBonus) fpc += upg.followersPerClickBonus * upg.level
            if (upg.passiveFollowersPerSecondBonus)
              pfps += upg.passiveFollowersPerSecondBonus * upg.level
            if (upg.moneyPerFollowerBonus)
              moneyPerFollowerBonusTotal += upg.moneyPerFollowerBonus * upg.level
          }
        })

        return {
          calculatedFollowersPerClick: fpc,
          calculatedPassiveFollowersPerSecond: pfps,
          calculatedMoneyPerFollowerPerSecond:
            gs.baseMoneyPerFollowerPerSecond * (1 + moneyPerFollowerBonusTotal),
        }
      },
      tick: () => {
        set((state) => {
          const now = Date.now()
          const deltaSeconds = (now - state.gameState.lastTick) / 1000

          const rates = get().calculateRates(state.gameState)

          const newFollowers =
            state.gameState.followers + rates.calculatedPassiveFollowersPerSecond * deltaSeconds

          const moneyFromFollowers =
            newFollowers * rates.calculatedMoneyPerFollowerPerSecond * deltaSeconds

          let moneyFromMonetization = 0
          Object.values(state.gameState.monetizationOptions).forEach((opt) => {
            if (opt.active) {
              moneyFromMonetization += opt.moneyPerSecond * deltaSeconds
            }
          })

          const newMoney = state.gameState.money + moneyFromFollowers + moneyFromMonetization

          // Update Insanity Level
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
            insanityLevelIndex: newInsanityIndex,
            followersPerClick: rates.calculatedFollowersPerClick,
            passiveFollowersPerSecond: rates.calculatedPassiveFollowersPerSecond,
            lastTick: now,
          }

          // Check for unlocks
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

          // Check Achievements
          Object.keys(nextState.achievements).forEach((key) => {
            const ach = nextState.achievements[key]
            if (!ach.unlocked && ach.condition(nextState)) {
              nextState.achievements[key] = { ...ach, unlocked: true }
              console.log(`Achievement Unlocked: ${ach.name}`)
              if (ach.reward) {
                const rewardChanges = ach.reward(nextState)
                Object.assign(nextState, rewardChanges)
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
          set({
            gameState: {
              ...initialGameState,
              ...importedState,
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
    }),
    {
      name: "conspiracy-clicker-storage",
    }
  )
)
