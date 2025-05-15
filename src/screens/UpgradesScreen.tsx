import React from 'react';
import { GameState, Upgrade as UpgradeType } from '../types';
import UpgradeItem from '../components/UpgradeItem';

interface UpgradesScreenProps {
  gameState: GameState;
  onPurchaseUpgrade: (id: string) => void;
}

const UpgradesScreen: React.FC<UpgradesScreenProps> = ({ gameState, onPurchaseUpgrade }) => {
  return (
    <div>
      <h2>Invest in "Research" (and Propaganda)</h2>
      <p>Buy better equipment, hire help, and expand your reach.</p>
      <div className="item-list">
        {Object.values(gameState.upgrades)
          .filter(upg => upg.unlocked)
          .sort((a,b) => a.baseCost - b.baseCost) // Optional: sort
          .map(upgrade => (
          <UpgradeItem
            key={upgrade.id}
            upgrade={upgrade}
            money={gameState.money}
            onPurchase={onPurchaseUpgrade}
          />
        ))}
      </div>
    </div>
  );
};
export default UpgradesScreen;