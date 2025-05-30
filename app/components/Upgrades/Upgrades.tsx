import React from "react"
import { AvailableUpgradeDisplay } from "../../hooks/useUpgrades"
import { UpgradeItem } from "./Item"

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
    <div className="upgrades-screen">
      <h2>Invest in “Research” (and Propaganda)</h2>
      <p>
        Buy better equipment, hire help, and expand your reach. Current Money: $
        {currentMoney.toFixed(2)}
      </p>
      {sortedAvailableUpgrades.length === 0 && (
        <p>No upgrades available yet. Keep building your empire!</p>
      )}
      <div className="item-list">
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
