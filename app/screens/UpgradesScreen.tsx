import React from "react"
import { GameState } from "../types"
import UpgradeItem from "../components/UpgradeItem"
import { INITIAL_UPGRADES } from "../data/upgrades"

interface UpgradesScreenProps {
  gameState: GameState
  onPurchaseUpgrade: (id: string) => void
}

const UpgradesScreen: React.FC<UpgradesScreenProps> = ({ gameState, onPurchaseUpgrade }) => {
  // Get all upgrades that either exist in player's state or are initially unlocked
  const availableUpgrades = Object.values(INITIAL_UPGRADES)
    .map((upgrade) => {
      const playerUpgrade = gameState.upgrades.find((u) => u.id === upgrade.id)
      return {
        ...upgrade,
        level: playerUpgrade?.level ?? 0,
      }
    })
    .filter((upgrade) => upgrade.unlocked || gameState.upgrades.some((u) => u.id === upgrade.id))
    .sort((a, b) => a.baseCost - b.baseCost)

  return (
    <div>
      <h2>Invest in &ldquo;Research&rdquo; (and Propaganda)</h2>
      <p>Buy better equipment, hire help, and expand your reach.</p>
      <div className="item-list">
        {availableUpgrades.map((upgrade) => (
          <UpgradeItem
            key={upgrade.id}
            upgrade={upgrade}
            money={gameState.money}
            onPurchase={onPurchaseUpgrade}
          />
        ))}
      </div>
    </div>
  )
}

export default UpgradesScreen
