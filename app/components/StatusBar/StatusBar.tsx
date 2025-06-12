import React from "react"
import { formatNumber } from "../../utils/formatters"
import { Stat } from "./Stat"

import { container, iconsContainer } from "./StatusBar.css"

interface StatusBarProps {
  money: number
  followers: number
  moneyPerSecond: number
  postsMade: number
  postsPerClick: number
  followersPerClick: number
  followersPerSecond: number
  autoPostsPerSecond: number
}

export const StatusBar: React.FC<StatusBarProps> = ({
  money,
  moneyPerSecond,
  followers,
  postsMade,
  followersPerSecond,
  autoPostsPerSecond,
  postsPerClick,
  followersPerClick,
}) => {
  return (
    <>
      <div className={container}>
        <div className={iconsContainer}>
          <Stat
            icon="posts"
            rate={formatNumber(autoPostsPerSecond, true)}
            total={formatNumber(postsMade)}
            label="Posts"
            perClick={postsPerClick}
          />
          <Stat
            icon="followers"
            rate={formatNumber(followersPerSecond, true)}
            total={formatNumber(followers)}
            label="Followers"
            perClick={followersPerClick}
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
