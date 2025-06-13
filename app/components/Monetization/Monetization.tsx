import React from "react"
import { AvailableMonetizationDisplay } from "../../hooks/useMonetization"
import { MonetizationItem } from "./Item"

import { container, itemsContainer } from "./Monetization.css"

interface MonetizationScreenProps {
  availableMonetization: AvailableMonetizationDisplay[]
  onActivateMonetization: (id: string) => void
  currentMoney: number
  currentFollowers: number
}

export const Monetization: React.FC<MonetizationScreenProps> = ({
  availableMonetization,
  onActivateMonetization,
  currentMoney,
  currentFollowers,
}) => (
  <div className={container}>
    <h2>Grift & Monetize</h2>
    <p>Turn your followers into cold, hard cash.</p>
    {availableMonetization.length === 0 && (
      <p>No monetization options available yet. Keep posting!</p>
    )}
    <div className={itemsContainer}>
      {availableMonetization.map((option) => (
        <MonetizationItem
          key={option.id}
          option={option}
          money={currentMoney}
          followers={currentFollowers}
          onActivate={onActivateMonetization}
        />
      ))}
    </div>
  </div>
)
