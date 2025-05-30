import React from "react"
import { AvailableMonetizationDisplay } from "../../../hooks/useMonetization"
import { MonetizationItem } from "./Item"


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
}) => {
  const sortedAvailableOptions = [...availableMonetization].sort(
    (a, b) => a.followerRequirement - b.followerRequirement
  )

  return (
    <div className="monetization-screen">
      {" "}
      <h2>Grift & Monetize</h2>
      <p>
        Turn your followers into cold, hard cash. Current: ${currentMoney.toFixed(2)}, Followers:{" "}
        {Math.floor(currentFollowers)}
      </p>
      {sortedAvailableOptions.length === 0 && (
        <p>No monetization options available yet. Keep posting!</p>
      )}
      <div className="item-list">
        {sortedAvailableOptions.map((option) => (
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
}
