import { useEffect, useRef } from "react"
import { GameState } from "../types"
import { INITIAL_ACHIEVEMENTS } from "../data/achievements"
// import { AVAILABLE_UPGRADES } from '../data/upgrades'
// uncomment to allow display for available upgrades too

export const useAchievementNotifications = (
  gameState: GameState,
  showToast: (message: string) => void
) => {
  const prevAchievements = useRef<string[]>([])
  // const prevUpgrades = useRef<string[]>([])

  useEffect(() => {
    // Check for new achievements
    const newAchievements = gameState.unlockedAchievements.filter(
      (id) => !prevAchievements.current.includes(id)
    )

    if (newAchievements.length > 0 && prevAchievements.current.length > 0) {
      newAchievements.forEach((id) => {
        const achievement = INITIAL_ACHIEVEMENTS[id]
        showToast(`Achievement Unlocked: ${achievement?.name || id}`)
      })
    }

    // Check for new upgrades
    // const currentUpgradeIds = gameState.upgrades.map(u => u.id)
    // const newUpgrades = currentUpgradeIds.filter(
    //   id => !prevUpgrades.current.includes(id)
    // )

    // if (newUpgrades.length > 0 && prevUpgrades.current.length > 0) {
    //   newUpgrades.forEach(id => {
    //     const upgrade = AVAILABLE_UPGRADES[id]
    //     showToast(`🆙 New Upgrade Available: ${upgrade?.name || id}`)
    //   })
    // }

    // Update refs
    prevAchievements.current = [...gameState.unlockedAchievements]
    // prevUpgrades.current = [...currentUpgradeIds]
  }, [gameState.unlockedAchievements, showToast])
}
