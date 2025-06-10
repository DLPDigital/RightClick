import React from "react"
import { formatNumber } from "../../utils/formatters"
import { Stat } from "./Stat"

import { container, iconsContainer } from "./StatusBar.css"

interface StatusBarProps {
  money: number
  followers: number
  moneyPerSecond: number
  postsMade: number
  followersPerSecond: number
}

export const StatusBar: React.FC<StatusBarProps> = ({
  money,
  moneyPerSecond,
  followers,
  postsMade,
  followersPerSecond,
}) => {
  return (
    <>
      <div className={container}>
        <div className={iconsContainer}>
          <Stat icon="posts" rate={2} total={postsMade} label="Posts" />
          <Stat
            icon="followers"
            rate={followersPerSecond}
            total={formatNumber(followers)}
            label="Followers"
          />
          <Stat
            icon="money"
            rate={`$${formatNumber(moneyPerSecond, true)}`}
            total={`$${formatNumber(money, true)}`}
            label="Money"
          />
        </div>
      </div>
    </>
  )
}
