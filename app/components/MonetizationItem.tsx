import React from "react"
import { MonetizationOption } from "../types"
import { formatNumber } from "../utils/formatters"

interface MonetizationItemProps {
  option: MonetizationOption & { active: boolean } // Combine static data with active state
  money: number
  followers: number
  onActivate: (id: string) => void
}

const MonetizationItem: React.FC<MonetizationItemProps> = ({
  option,
  money,
  followers,
  onActivate,
}) => {
  const canActivate =
    !option.active && money >= option.costToActivate && followers >= option.followerRequirement

  return (
    <div className="item">
      <h3>{option.name}</h3>
      <p>{option.description}</p>
      <p>Requires: {formatNumber(option.followerRequirement)} Followers</p>
      {option.costToActivate > 0 && <p>Activation Cost: ${formatNumber(option.costToActivate)}</p>}
      <p>Income: ${formatNumber(option.moneyPerSecond)}/sec</p>
      <button onClick={() => onActivate(option.id)} disabled={!canActivate || option.active}>
        {option.active ? "Active" : canActivate ? "Activate" : "Requirements Not Met"}
      </button>
    </div>
  )
}

export default MonetizationItem
