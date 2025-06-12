import React from "react"
import { UpgradeItem } from "./Item"
import { AvailableUpgradeDisplay } from "../../types"
import { AUTO_POST_FOLLOWER_WEIGHTING } from "../../data/constants"

import { container, itemsContainer } from "./Upgrades.css"

interface UpgradesScreenProps {
  availableUpgrades: AvailableUpgradeDisplay[]
  onPurchaseUpgrade: (id: string) => void
  currentMoney: number
}

export const Upgrades: React.FC<UpgradesScreenProps> = ({
  availableUpgrades,
  onPurchaseUpgrade,
  currentMoney,
}) => {
  const sortedAvailableUpgrades = [...availableUpgrades].sort((a, b) => {
    if (a.canAfford && !b.canAfford) return -1
    if (!a.canAfford && b.canAfford) return 1
    return a.currentCost - b.currentCost
  })

  return (
    <div className={container}>
      <h2>Invest in “Research” (and Propaganda)</h2>
      <p>Buy better equipment, hire help, and expand your reach.</p>
      <p>
        Note: Autoposts generate followers but they aren&apos;t as enticing, so they are only{" "}
        {AUTO_POST_FOLLOWER_WEIGHTING * 100}% as effective as manual posting.
      </p>
      {sortedAvailableUpgrades.length === 0 && (
        <p>No upgrades available yet. Keep building your empire!</p>
      )}
      <div className={itemsContainer}>
        {sortedAvailableUpgrades.map((upgrade) => (
          <UpgradeItem
            key={upgrade.id}
            upgrade={upgrade}
            money={currentMoney}
            onPurchase={onPurchaseUpgrade}
          />
        ))}
      </div>
    </div>
  )
}
