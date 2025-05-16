import React from "react"
import { GameState } from "../types"
import MonetizationItem from "../components/MonetizationItem"
import { INITIAL_MONETIZATION_OPTIONS } from "../data/monetization"

interface MonetizationScreenProps {
  gameState: GameState
  onActivateMonetization: (id: string) => void
}

const MonetizationScreen: React.FC<MonetizationScreenProps> = ({
  gameState,
  onActivateMonetization,
}) => {
  // Map the monetization options from game state to full options with data
  const availableOptions = gameState.monetizationOptions.map(stateOption => {
    const optionData = INITIAL_MONETIZATION_OPTIONS[stateOption.id]
    return {
      ...optionData,
      active: stateOption.active
    }
  }).sort((a, b) => a.followerRequirement - b.followerRequirement)

  return (
    <div>
      <h2>Grift & Monetize</h2>
      <p>Turn your followers into cold, hard cash.</p>
      <div className="item-list">
        {availableOptions.map((option) => (
          <MonetizationItem
            key={option.id}
            option={option}
            money={gameState.money}
            followers={gameState.followers}
            onActivate={onActivateMonetization}
          />
        ))}
      </div>
    </div>
  )
}

export default MonetizationScreen