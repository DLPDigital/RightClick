import { useCallback } from "react"
import { GameState } from "../types"

export const useCalculateRates = () => {
  return useCallback((gs: GameState) => {
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

    // Check monetization unlocks
    Object.keys(gs.monetizationOptions).forEach((key) => {
      const option = gs.monetizationOptions[key]
      if (!option.unlocked && option.requirement && option.requirement(gs)) {
        gs.monetizationOptions[key] = {
          ...option,
          unlocked: true,
        }
      }
    })
    return {
      calculatedFollowersPerClick: fpc,
      calculatedPassiveFollowersPerSecond: pfps,
      calculatedMoneyPerFollowerPerSecond:
        gs.baseMoneyPerFollowerPerSecond * (1 + moneyPerFollowerBonusTotal),
    }
  }, [])
}
