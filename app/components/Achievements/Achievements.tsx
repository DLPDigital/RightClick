import React from "react"
import { Achievement, InsanityStage } from "../../types"
import { AchievementItem } from "./Item"

import { achievementsScreen, achievementList } from "./Achievements.css"

interface AchievementsScreenProps {
  allAchievements: Record<string, Achievement>
  unlockedAchievementIds: string[]
  insanity: InsanityStage
  postsMade: number
}

export const Achievements: React.FC<AchievementsScreenProps> = ({
  allAchievements,
  unlockedAchievementIds,
  insanity,
  postsMade
}) => {
  return (
    <div className={achievementsScreen}>
      <h2>Clout & Achievements</h2>
      <p>You have posted {postsMade}! Your audience are rated {insanity.name}</p>
      <p>Many are thinking &ldquo;{insanity.description}&rdquo;</p>
      <h3>Achievements</h3>
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
}
