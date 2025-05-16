import React from 'react'
import { INITIAL_ACHIEVEMENTS } from '../data/achievements'

interface AchievementsScreenProps {
  unlockedAchievements: string[]
}

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ unlockedAchievements }) => {
  return (
    <div>
      <h2>Achievements</h2>
      <div className="achievement-list">
        {Object.entries(INITIAL_ACHIEVEMENTS).map(([id, achievement]) => (
          <div key={id} className={`achievement ${unlockedAchievements.includes(id) ? 'unlocked' : ''}`}>
            <h3>{achievement.name}</h3>
            <p>{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AchievementsScreen