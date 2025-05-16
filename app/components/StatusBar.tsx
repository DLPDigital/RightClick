import React from "react"
import { InsanityStage } from "../types"
import { formatNumber } from "../utils/formatters"

interface StatusBarProps {
  money: number
  followers: number
  currentInsanityStage: InsanityStage
  moneyPerSecond: number
}

const StatusBar: React.FC<StatusBarProps> = ({
  money,
  moneyPerSecond,
  followers,
  currentInsanityStage,
}) => {
  return (
    <div className="status-bar">
      <span>Money: ${formatNumber(money, true)}</span>
      <span>Money per sec: ${formatNumber(moneyPerSecond, true)}</span>
      <span>Followers: {formatNumber(followers)}</span>
      <span>
        Insanity: {currentInsanityStage.name} ({currentInsanityStage.description})
      </span>
    </div>
  )
}
export default StatusBar
