import React from 'react';
import { InsanityStage } from '../types';
import { formatNumber } from '../utils/formatters';

interface StatusBarProps {
  money: number;
  followers: number;
  currentInsanityStage: InsanityStage;
}

const StatusBar: React.FC<StatusBarProps> = ({ money, followers, currentInsanityStage }) => {
  return (
    <div className="status-bar">
      <span>Money: ${formatNumber(money)}</span>
      <span>Followers: {formatNumber(followers)}</span>
      <span>Insanity: {currentInsanityStage.name} ({currentInsanityStage.description})</span>
    </div>
  );
};
export default StatusBar;