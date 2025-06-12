import { MonetizationOption } from "../types"

export const INITIAL_MONETIZATION_OPTIONS: Record<string, MonetizationOption> = {
  "shady-supplement": {
    id: "shady-supplement",
    name: "Supplement Sponsorship",
    description: 'Sell "Brain Clarity Plus" to your followers.',
    costToActivate: 100,
    followerRequirement: 200,
    moneyPerSecond: 0.5,
    active: false,
    unlocked: false,
    requirement: (gs) => gs.followers >= 5 && gs.money >= 0.01,
  },
  "podcast-sponsorships": {
    id: "podcast-sponsorships",
    name: "Sponsor a Podcast",
    description: "Promote your friend's all natural yoga, subscriber only podcast.",
    costToActivate: 800,
    followerRequirement: 1000,
    moneyPerSecond: 1,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const supplementItem = gs.monetizationOptions.find((u) => u.id === "shady-supplement")
      return !!(supplementItem && supplementItem.active)
    },
  },
  "launch-newsletter": {
    id: "launch-newsletter",
    name: "Launch Your Newsletter",
    description:
      "Send all your scoops directly to your followers' inboxes, they need to know immediately (but only if they can pay)",
    costToActivate: 2000,
    followerRequirement: 5000,
    moneyPerSecond: 3,
    active: false,
    unlocked: false,
    requirement: (gs) => gs.followers >= 5000 && gs.money == 2000,
  },
  "gold-buying": {
    id: "gold-buying",
    name: "Gold Buying",
    description: "Sell gold to your followers. They will love it.",
    costToActivate: 5000,
    followerRequirement: 5000,
    moneyPerSecond: 10,
    active: false,
    unlocked: false,
    requirement: (gs) => gs.followers >= 5000,
  },
  "survival-gear": {
    id: "survival-gear",
    name: "Survival Gear",
    description:
      "Sell all manner of tactical gear to your followers. Weapons, supplies, they'll need!",
    costToActivate: 10000,
    followerRequirement: 30000,
    moneyPerSecond: 50,
    active: false,
    unlocked: false,
    requirement: (gs) => gs.followers >= 5000,
  },
  merch: {
    id: "merch",
    name: "Merch!",
    description:
      "Everyone is selling merch, why shouldn't you jump on that bandwagon? We've got t-shirts, caps, mousemats, water bottles, all made in China!",
    costToActivate: 20000,
    followerRequirement: 50000,
    moneyPerSecond: 100,
    active: false,
    unlocked: false,
    requirement: (gs) => gs.followers >= 10000,
  },
  podcast: {
    id: "podcast",
    name: "Start a Podcast",
    description:
      "People want to hear what you've got to say, it doesn't matter on what but it's 3 hours worth a day",
    costToActivate: 50000,
    followerRequirement: 100000,
    moneyPerSecond: 250,
    active: false,
    unlocked: false,
    requirement: (gs) => gs.followers >= 20000,
  },
  "youtube-channel": {
    id: "youtube-channel",
    name: "YouTube Channel",
    description: "Your podcast just isn't enough anymore, people want to SEE you",
    costToActivate: 500000,
    followerRequirement: 800000,
    moneyPerSecond: 500,
    active: false,
    unlocked: false,
    requirement: (gs) => gs.followers >= 50000,
  },
}
