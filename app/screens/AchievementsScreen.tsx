import React from "react"
import { Achievement } from "../types"

interface AchievementsScreenProps {
  allAchievements: Record<string, Achievement>
  unlockedAchievementIds: string[]
}

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({
  allAchievements,
  unlockedAchievementIds,
}) => {
  return (
    <div className="achievements-screen">
      {" "}
      <h2>Achievements</h2>
      <div className="achievement-list">
        {Object.entries(allAchievements).map(([id, achievement]) => (
          <div
            key={id}
            className={`achievement-item ${
              unlockedAchievementIds.includes(id) ? "unlocked" : "locked"
            }`}
            title={unlockedAchievementIds.includes(id) ? "Unlocked!" : "Locked"}
          >
            <h3>{achievement.name}</h3>
            <p>{achievement.description}</p>
            {!unlockedAchievementIds.includes(id) &&
              typeof achievement.condition === "function" && (
                <p className="achievement-condition">
                  <em>
                    How to unlock: (Condition not explicitly displayed here, but you could add logic
                    to describe it based on `achievement.condition.toString()` or a hint field)
                  </em>
                </p>
              )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AchievementsScreen
