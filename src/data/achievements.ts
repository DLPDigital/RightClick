import { Achievement } from '../types';
// Import INSANITY_STAGES to use in conditions if needed
import { INSANITY_STAGES } from './insanityLevels';

export const INITIAL_ACHIEVEMENTS: Record<string, Achievement> = {
  'first-post': {
    id: 'first-post',
    name: 'The First Truth Bomb',
    description: 'You made your first post!',
    unlocked: false,
    condition: (gs) => gs.postsMade >= 1,
  },
  'follower-milestone-100': {
    id: 'follower-milestone-100',
    name: 'Centurion of Truth',
    description: 'Reached 100 followers.',
    unlocked: false,
    condition: (gs) => gs.followers >= 100,
  },
  'money-milestone-1k': {
    id: 'money-milestone-1k',
    name: 'Grifter Graduate',
    description: 'Earned your first $1000.',
    unlocked: false,
    condition: (gs) => gs.money >= 1000,
  },
  'tin-foil-hat': {
    id: 'tin-foil-hat',
    name: 'Tin Foil Connoisseur',
    description: 'Reached "Red Pilled" status.',
    unlocked: false,
    condition: (gs) => gs.insanityLevelIndex >= INSANITY_STAGES.findIndex(s => s.name === "Red Pilled"),
  }
  // ... more achievements
};