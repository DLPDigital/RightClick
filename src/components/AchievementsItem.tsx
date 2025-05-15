import React from 'react';
import { Achievement } from '../types';

interface AchievementItemProps {
  achievement: Achievement;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ achievement }) => {
  return (
    <div className={`item ${achievement.unlocked ? 'unlocked' : 'locked'}`}>
      <h3>{achievement.name} {achievement.unlocked ? '✅' : '🔒'}</h3>
      <p>{achievement.description}</p>
    </div>
  );
};
export default AchievementItem;