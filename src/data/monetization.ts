import { MonetizationOption } from '../types';

export const INITIAL_MONETIZATION_OPTIONS: Record<string, MonetizationOption> = {
  'shady-supplement': {
    id: 'shady-supplement',
    name: 'Shady Supplement Sponsorship',
    description: 'Sell "Brain Clarity Plus" to your followers. Increases money per second.',
    costToActivate: 0, // Activated by follower count
    followerRequirement: 100,
    moneyPerSecond: 0.5,
    active: false,
    unlocked: false,
    requirement: (gs) => gs.followers >= 100,
  },
  'podcast-sponsorships': {
    id: 'podcast-sponsorships',
    name: 'Podcast Sponsorships',
    description: 'Monetize your podcast with "alternative health" products.',
    costToActivate: 0,
    followerRequirement: 1000,
    moneyPerSecond: 5,
    active: false,
    unlocked: false,
    requirement: (gs) => gs.upgrades['basic-mic']?.level > 0 && gs.followers >= 1000,
  },
  // ... more: Merch, "Truth Conferences", Paid Newsletter, "Survival Gear" affiliate
};