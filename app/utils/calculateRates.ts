import { GameState } from "../types"
import { AVAILABLE_UPGRADES } from "../data/upgrades" // Assuming this path

export const calculateRates = (
  gs: GameState
): {
  calculatedFollowersPerClick: number
  calculatedPassiveFollowersPerSecond: number
  calculatedMoneyPerFollowerPerSecond: number
  calculatedPostsPerClick: number
  calculatedAutoPostsPerSecond: number
} => {
  let followersPerClick = 1
  let passiveFollowersPerSecond = 0
  let moneyPerFollowerBonusTotal = 0
  let postsPerClick = 1 // Initialize to base value
  let autoPostsPerSecond = 0 // Initialize to base value
  const upgrades = Array.isArray(gs.upgrades) ? gs.upgrades : []

  upgrades.forEach(({ id, level }) => {
    const upgradeDetails = AVAILABLE_UPGRADES[id]
    if (upgradeDetails && level > 0) {
      if (upgradeDetails.followersPerClickBonus) {
        followersPerClick += upgradeDetails.followersPerClickBonus * level
      }
      if (upgradeDetails.passiveFollowersPerSecondBonus) {
        passiveFollowersPerSecond += upgradeDetails.passiveFollowersPerSecondBonus * level
      }
      if (upgradeDetails.moneyPerFollowerBonus) {
        moneyPerFollowerBonusTotal += upgradeDetails.moneyPerFollowerBonus * level
      }
      if (upgradeDetails.postsPerClickBonus) {
        postsPerClick += upgradeDetails.postsPerClickBonus * level
      }
      if (upgradeDetails.autoPostsPerSecondBonus) {
        autoPostsPerSecond += upgradeDetails.autoPostsPerSecondBonus * level
      }
    }
  })

  return {
    calculatedFollowersPerClick: followersPerClick,
    calculatedPassiveFollowersPerSecond: passiveFollowersPerSecond,
    calculatedMoneyPerFollowerPerSecond:
      gs.baseMoneyPerFollowerPerSecond * (1 + moneyPerFollowerBonusTotal),
    calculatedPostsPerClick: postsPerClick,
    calculatedAutoPostsPerSecond: autoPostsPerSecond,
  }
}
