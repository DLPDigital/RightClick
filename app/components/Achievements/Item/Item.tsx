import React from "react"
import { Achievement } from "../../../types"
import { TargetIcon } from "../../SVG"

import { achievementItem, iconContainer } from "./Item.css"
import { vars } from "../../../theme/theme.css"

type Props = {
  achievement: Achievement
}

export const AchievementItem: React.FC<Props> = ({ achievement }) => (
  <div className={achievementItem}>
    <div className={iconContainer}>
      <TargetIcon fill={vars.color.secondary} />
    </div>
    <h4>{achievement.name}</h4>
    <p>{achievement.description}</p>
  </div>
)
