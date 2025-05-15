import React from 'react';
import { GameState } from '../types';
// import { GameState, MonetizationOption as MonetizationOptionType } from '../types';
import MonetizationItem from '../components/MonetizationItem';

interface MonetizationScreenProps {
  gameState: GameState;
  onActivateMonetization: (id: string) => void;
}

const MonetizationScreen: React.FC<MonetizationScreenProps> = ({ gameState, onActivateMonetization }) => {
  return (
    <div>
      <h2>Grift & Monetize</h2>
      <p>Turn your followers into cold, hard cash.</p>
      <div className="item-list">
        {Object.values(gameState.monetizationOptions)
          .filter(opt => opt.unlocked)
          .sort((a,b) => a.followerRequirement - b.followerRequirement) // Optional: sort
          .map(option => (
          <MonetizationItem
            key={option.id}
            option={option}
            money={gameState.money}
            followers={gameState.followers}
            onActivate={onActivateMonetization}
          />
        ))}
      </div>
    </div>
  );
};
export default MonetizationScreen;