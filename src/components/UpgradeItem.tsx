import React from 'react';
import { Upgrade } from '../types';
import { formatNumber } from '../utils/formatters';

interface UpgradeItemProps {
  upgrade: Upgrade;
  money: number;
  onPurchase: (id: string) => void;
}

const UpgradeItem: React.FC<UpgradeItemProps> = ({ upgrade, money, onPurchase }) => {
  const currentCost = upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.level);
  const canAfford = money >= currentCost;
  const isMaxLevel = upgrade.maxLevel !== undefined && upgrade.level >= upgrade.maxLevel;

  if (!upgrade.unlocked) return null;

  return (
    <div className="item">
      <h3>{upgrade.name} (Lvl: {upgrade.level}{upgrade.maxLevel ? `/${upgrade.maxLevel}` : ''})</h3>
      <p>{upgrade.description}</p>
      <p>Cost: ${formatNumber(currentCost)}</p>
      {upgrade.followersPerClickBonus && <p>Effect: +{upgrade.followersPerClickBonus} Followers/Post</p>}
      {upgrade.passiveFollowersPerSecondBonus && <p>Effect: +{upgrade.passiveFollowersPerSecondBonus} Followers/Sec</p>}
      {upgrade.moneyPerFollowerBonus && <p>Effect: +{upgrade.moneyPerFollowerBonus * 100}% Money/Follower</p>}
      <button onClick={() => onPurchase(upgrade.id)} disabled={!canAfford || isMaxLevel}>
        {isMaxLevel ? "Max Level" : (canAfford ? "Buy" : "Not Enough Money")}
      </button>
    </div>
  );
};
export default UpgradeItem;