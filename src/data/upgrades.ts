import { Upgrade } from '../types';

export const INITIAL_UPGRADES: Record<string, Upgrade> = {
  'faster-typing': {
    id: 'faster-typing',
    name: 'Faster Typing',
    description: 'Type out those truths quicker!',
    baseCost: 10,
    costMultiplier: 1.15,
    level: 0,
    unlocked: true,
    followersPerClickBonus: 1,
  },
  'clickbait-headlines': {
    id: 'clickbait-headlines',
    name: 'Clickbait Headlines',
    description: 'Lure them in with irresistible titles.',
    baseCost: 100,
    costMultiplier: 1.2,
    level: 0,
    unlocked: false,
    followersPerClickBonus: 5,
    requirement: (gs) => gs.followers >= 50,
  },
  'basic-mic': {
    id: 'basic-mic',
    name: 'Basic Microphone',
    description: 'Start your own podcast (very quietly).',
    baseCost: 1000,
    costMultiplier: 1, // One-time purchase for now, or could upgrade quality
    level: 0,
    maxLevel: 1,
    unlocked: false,
    unlocks: ['podcast-sponsorships'],
    requirement: (gs) => gs.followers >= 500 && gs.money >= 1000,
  },
  'intern-army': {
    id: 'intern-army',
    name: 'Hire an Intern',
    description: 'They post while you "research". +1 follower/sec.',
    baseCost: 5000,
    costMultiplier: 1.5,
    level: 0,
    unlocked: false,
    passiveFollowersPerSecondBonus: 1,
    requirement: (gs) => gs.followers >= 2000,
  },
  // ... more upgrades: SEO, Bot Farm, Green Screen, Studio, etc.
};