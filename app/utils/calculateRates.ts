import { GameState } from "../types"
import { AUTO_POST_FOLLOWER_WEIGHTING } from "../data/constants"
import { AVAILABLE_UPGRADES } from "../data/upgrades"

export const calculateRates = (
  gs: GameState
): {
  calculatedFollowersPerClick: number
  calculatedPassiveFollowersPerSecond: number
  calculatedMoneyPerFollowerPerSecond: number
  calculatedPostsPerClick: number
  calculatedAutoPostsPerSecond: number
} => {
  let baseFollowerRatePerPost = 1
  let currentPassiveFollowersPerSecond = 0
  let moneyPerFollowerBonusTotal = 0
  let currentPostsPerClick = 1
  let currentAutoPostsPerSecond = 0
  const upgrades = Array.isArray(gs.upgrades) ? gs.upgrades : []

  upgrades.forEach(({ id, level }) => {
    const upgradeDetails = AVAILABLE_UPGRADES[id]
    if (upgradeDetails && level > 0) {
      if (upgradeDetails.followersPerClickBonus) {
        baseFollowerRatePerPost += upgradeDetails.followersPerClickBonus * level
      }
      if (upgradeDetails.passiveFollowersPerSecondBonus) {
        currentPassiveFollowersPerSecond += upgradeDetails.passiveFollowersPerSecondBonus * level
      }
      if (upgradeDetails.moneyPerFollowerBonus) {
        moneyPerFollowerBonusTotal += upgradeDetails.moneyPerFollowerBonus * level
      }
      if (upgradeDetails.postsPerClickBonus) {
        currentPostsPerClick += upgradeDetails.postsPerClickBonus * level
      }
      if (upgradeDetails.autoPostsPerSecondBonus) {
        currentAutoPostsPerSecond += upgradeDetails.autoPostsPerSecondBonus * level
      }
    }
  })

  const finalCalculatedFollowersPerClick = baseFollowerRatePerPost * currentPostsPerClick

  const followersGeneratedByAutoPosts =
    currentAutoPostsPerSecond * finalCalculatedFollowersPerClick * AUTO_POST_FOLLOWER_WEIGHTING

  return {
    calculatedFollowersPerClick: finalCalculatedFollowersPerClick,
    calculatedPassiveFollowersPerSecond:
      currentPassiveFollowersPerSecond + followersGeneratedByAutoPosts,
    calculatedMoneyPerFollowerPerSecond:
      gs.baseMoneyPerFollowerPerSecond * (1 + moneyPerFollowerBonusTotal),
    calculatedPostsPerClick: currentPostsPerClick,
    calculatedAutoPostsPerSecond: currentAutoPostsPerSecond,
  }
}
