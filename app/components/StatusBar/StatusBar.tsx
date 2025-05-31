import React from "react"
import { InsanityStage } from "../../types"
import { formatNumber } from "../../utils/formatters"

import { container, stats, statsContainer, insanityLevel, stat } from "./StatusBar.css"

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
      <div className={stats}>
        <h4>Stats</h4>
        <div className={statsContainer}>
          <div className={stat}>
            <h5>Money:</h5>
            <span>${formatNumber(money, true)}</span>
          </div>
          <div className={stat}>
            <h5>Money per sec:</h5>
            <span>${formatNumber(moneyPerSecond, true)}</span>
          </div>
          <div className={stat}>
            <h5>Followers:</h5>
            <span>{formatNumber(followers)}</span>
          </div>
        </div>
      </div>
      <div className={insanityLevel}>
        <h4>Insanity Level</h4>
        <h5>Current mind melt:</h5>
        <span>
          {currentInsanityStage.name} ({currentInsanityStage.description})
        </span>
      </div>
    </div>
  )
}
