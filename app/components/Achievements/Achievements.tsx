import React from "react"
import { Achievement } from "../../types"
import { AchievementItem } from "./Item"

import { achievementsScreen, achievementList } from "./Achievements.css"

interface AchievementsScreenProps {
  allAchievements: Record<string, Achievement>
  unlockedAchievementIds: string[]
}

export const Achievements: React.FC<AchievementsScreenProps> = ({
  allAchievements,
  unlockedAchievementIds,
}) => (
  <div className={achievementsScreen}>
    <h2>Achievements</h2>
    <div className={achievementList}>
      {Object.entries(allAchievements).map(([id, achievement]) => {
        if (!unlockedAchievementIds.includes(id)) {
          return
        }
        return <AchievementItem achievement={achievement} key={id} />
      })}
    </div>
  </div>
)
