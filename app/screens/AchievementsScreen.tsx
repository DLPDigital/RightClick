import React from "react"
// Remove this import if you're receiving allAchievements as a prop
// import { INITIAL_ACHIEVEMENTS } from "../data/achievements";
// import { AchievementDefinition } from "../data/achievements" // Assuming you created this type

// // Or, if you haven't created AchievementDefinition yet, use the Achievement type
// // and understand that 'unlocked' within it is just part of its static definition.
import { Achievement } from "../types"

interface AchievementsScreenProps {
  // Use the types for the props being passed from page.tsx
  allAchievements: Record<string, Achievement> // Or Record<string, Achievement>
  unlockedAchievementIds: string[]
}

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({
  allAchievements,
  unlockedAchievementIds,
}) => {
  return (
    <div className="achievements-screen">
      {" "}
      {/* Added a class for potential styling */}
      <h2>Achievements</h2>
      <div className="achievement-list">
        {Object.entries(allAchievements).map(([id, achievement]) => (
          <div
            key={id}
            className={`achievement-item ${
              // Changed class name for clarity
              unlockedAchievementIds.includes(id) ? "unlocked" : "locked" // Added 'locked' class
            }`}
            title={unlockedAchievementIds.includes(id) ? "Unlocked!" : "Locked"} // Optional: tooltip
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
            {/* You could add a visual indicator like a checkmark or lock icon */}
          </div>
        ))}
      </div>
      {/* <style jsx>{`
        .achievements-screen {
          padding: 20px;
        }
        .achievement-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
        }
        .achievement-item {
          border: 1px solid #ccc;
          padding: 15px;
          border-radius: 5px;
          background-color: #f9f9f9;
        }
        .achievement-item.unlocked {
          border-left: 5px solid green;
          background-color: #e6ffe6;
        }
        .achievement-item.locked {
          border-left: 5px solid #aaa;
          opacity: 0.7;
        }
        .achievement-item h3 {
          margin-top: 0;
        }
        .achievement-condition {
          font-size: 0.9em;
          color: #555;
        }
      `}</style> */}
    </div>
  )
}

export default AchievementsScreen
