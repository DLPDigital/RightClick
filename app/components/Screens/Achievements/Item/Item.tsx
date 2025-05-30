import React from "react"
import { Achievement } from "../../../../types"

import { achievementItem } from "./Item.css"

type Props = {
  achievement: Achievement
}

export const AchievementItem: React.FC<Props> = ({ achievement }) => (
  <div className={achievementItem}>
    <h3>{achievement.name}</h3>
    <p>{achievement.description}</p>
    {/* Potentially add later */}
    {/* {typeof achievement.condition === "function" && (
      <p className="achievement-condition">
        <em>
          How to unlock: (Condition not explicitly displayed here, but you could add logic to
          describe it based on `achievement.condition.toString()` or a hint field)
        </em>
      </p>
    )} */}
  </div>
)
