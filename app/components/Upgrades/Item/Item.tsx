import React from "react"
import { formatNumber } from "../../../utils/formatters"
import { Button } from "../../Button"
import { AvailableUpgradeDisplay } from "../../../types"

interface UpgradeItemProps {
  upgrade: AvailableUpgradeDisplay
  money: number
  onPurchase: (id: string) => void
}

export const UpgradeItem: React.FC<UpgradeItemProps> = ({ upgrade, money, onPurchase }) => {
  const handlePurchaseClick = () => {
    if (upgrade.canAfford && !upgrade.isMaxLevel) {
      onPurchase(upgrade.id)
    }
  }

  return (
    <div className="item-card upgrade-item">
      <h3>
        {upgrade.name} (Lvl: {upgrade.level}
        {upgrade.maxLevel !== undefined ? `/${upgrade.maxLevel}` : ""})
      </h3>
      <p>{upgrade.description}</p>
      {!upgrade.isMaxLevel && <p>Cost: ${formatNumber(upgrade.currentCost)}</p>}

      {/* {upgrade.followersPerClickBonus && ( // Assuming these are on AvailableUpgradeDisplay
        <p>Effect: +{formatNumber(upgrade.followersPerClickBonus)} Followers/Post (per level)</p>
      )}
      {upgrade.passiveFollowersPerSecondBonus && ( // Assuming these are on AvailableUpgradeDisplay
        <p>Effect: +{formatNumber(upgrade.passiveFollowersPerSecondBonus)} Followers/Sec (per level)</p>
      )}
      {upgrade.moneyPerFollowerBonus && ( // Assuming these are on AvailableUpgradeDisplay
        <p>Effect: +{upgrade.moneyPerFollowerBonus * 100}% Money/Follower (per level)</p>
      )} */}

      <Button onClick={handlePurchaseClick} disabled={!upgrade.canAfford || upgrade.isMaxLevel}>
        {upgrade.isMaxLevel ? "Max Level" : upgrade.canAfford ? "Buy" : "Not Enough Money"}
      </Button>
      {!upgrade.canAfford && !upgrade.isMaxLevel && (
        <div
          className="requirements-missing"
          style={{ fontSize: "0.9em", color: "#777", marginTop: "5px" }}
        >
          <small>Need ${formatNumber(upgrade.currentCost - money)} more</small>
        </div>
      )}
    </div>
  )
}
