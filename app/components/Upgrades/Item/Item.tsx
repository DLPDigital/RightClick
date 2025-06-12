import React from "react"
import { formatNumber } from "../../../utils/formatters"
import { Button } from "../../Button"
import { AvailableUpgradeDisplay } from "../../../types"
import { buildBonusSentence } from "../../../utils/buildBonusSentence"

import { card, missing } from "./Item.css"

interface UpgradeItemProps {
  upgrade: AvailableUpgradeDisplay
  money: number
  onPurchase: (id: string) => void
}

export const UpgradeItem: React.FC<UpgradeItemProps> = ({ upgrade, money, onPurchase }) => {
  const {
    name,
    level,
    maxLevel,
    description,
    currentCost,
    canAfford,
    isMaxLevel,
    id,
    followersPerClickBonus,
    postsPerClickBonus,
    autoPostsPerSecondBonus,
    passiveFollowersPerSecondBonus,
  } = upgrade

  const handlePurchaseClick = () => {
    if (canAfford && !isMaxLevel) {
      onPurchase(id)
    }
  }

  const bonusSentence = buildBonusSentence({
    followersPerClickBonus,
    postsPerClickBonus,
    autoPostsPerSecondBonus,
    passiveFollowersPerSecondBonus,
  })

  return (
    <div className={card}>
      <h3>
        {name} (Lvl: {level}
        {maxLevel !== undefined ? `/${maxLevel}` : ""})
      </h3>
      <p>{description}</p>
      {bonusSentence !== "No effect." && <p>{bonusSentence}</p>}
      {!isMaxLevel && <p>Cost: ${formatNumber(currentCost)}</p>}

      <Button onClick={handlePurchaseClick} disabled={!canAfford || isMaxLevel}>
        {isMaxLevel ? "Max Level" : canAfford ? "Buy" : "Not Enough Money"}
      </Button>
      {!canAfford && !isMaxLevel && (
        <div className={missing}>
          <small>Need ${formatNumber(currentCost - money)} more</small>
        </div>
      )}
    </div>
  )
}
