import React from "react"
import { InsanityStage } from "../../types"
import { formatNumber } from "../../utils/formatters"

import { container } from "./StatusBar.css"

interface StatusBarProps {
  money: number
  followers: number
  currentInsanityStage: InsanityStage
  moneyPerSecond: number
}

export const StatusBar: React.FC<StatusBarProps> = ({
  money,
  moneyPerSecond,
  followers,
  currentInsanityStage,
}) => {
  return (
    <div className={container}>
      <span>Money: ${formatNumber(money, true)}</span>
      <span>Money per sec: ${formatNumber(moneyPerSecond, true)}</span>
      <span>Followers: {formatNumber(followers)}</span>
      <span>
        Insanity: {currentInsanityStage.name} ({currentInsanityStage.description})
      </span>
    </div>
  )
}
