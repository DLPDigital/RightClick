import React from 'react';
import { GameState } from '../types';
import AchievementItem from '../components/AchievementsItem';

interface AchievementsScreenProps {
  achievements: GameState['achievements'];
}

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ achievements }) => {
  return (
    <div>
      <h2>"Accolades"</h2>
      <p>Recognitions of your... influence.</p>
      <div className="item-list">
        {Object.values(achievements).map(ach => (
          <AchievementItem key={ach.id} achievement={ach} />
        ))}
      </div>
    </div>
  );
};
export default AchievementsScreen;