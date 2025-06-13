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
    requirement: (gs) => {
      const podcastSponsorshipItem = gs.monetizationOptions.find(
        (u) => u.id === "podcast-sponsorships"
      )
      return !!(podcastSponsorshipItem && podcastSponsorshipItem.active)
    },
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
    requirement: (gs) => {
      const newsletterItem = gs.monetizationOptions.find((u) => u.id === "launch-newsletter")
      return !!(newsletterItem && newsletterItem.active)
    },
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
    requirement: (gs) => {
      const goldBuyingItem = gs.monetizationOptions.find((u) => u.id === "gold-buying")
      return !!(goldBuyingItem && goldBuyingItem.active)
    },
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
    requirement: (gs) => {
      const survivalGearItem = gs.monetizationOptions.find((u) => u.id === "survival-gear")
      return !!(survivalGearItem && survivalGearItem.active)
    },
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
    requirement: (gs) => {
      const merchItem = gs.monetizationOptions.find((u) => u.id === "merch")
      return !!(merchItem && merchItem.active)
    },
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
    requirement: (gs) => {
      const podcastItem = gs.monetizationOptions.find((u) => u.id === "podcast")
      return !!(podcastItem && podcastItem.active)
    },
  },
  "podcast-network": {
    id: "podcast-network",
    name: "Podcast Network",
    description: "One podcast just isn't enough you, start a sprawling network",
    costToActivate: 750000,
    followerRequirement: 800000,
    moneyPerSecond: 700,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const youtubeItem = gs.monetizationOptions.find((u) => u.id === "youtube-channel")
      return !!(youtubeItem && youtubeItem.active)
    },
  },
  "newspaper": {
    id: "newspaper",
    name: "Start a newspaper",
    description: "Who said old media was dead? Not the way we do it, 17 issues a day, free for anyone who knows the handshake",
    costToActivate: 1000000,
    followerRequirement: 800000,
    moneyPerSecond: 250,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const podcastNetworkItem = gs.monetizationOptions.find((u) => u.id === "podcast-network")
      return !!(podcastNetworkItem && podcastNetworkItem.active)
    },
  },
  "tv-channel": {
    id: "tv-channel",
    name: "Our own TV Channel",
    description: "We're broadcasting 24/7 in every nursing home in the world, those seniors aren't gonna radicalise themselves",
    costToActivate: 2500000,
    followerRequirement: 1200000,
    moneyPerSecond: 800,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const newspaperItem = gs.monetizationOptions.find((u) => u.id === "newspaper")
      return !!(newspaperItem && newspaperItem.active)
    },
  },
  "making-movies": {
    id: "making-movies",
    name: "Making Movies",
    description: "We're making movies now, none of that woke stuff either. The hero always gets the girl, and she knows her place",
    costToActivate: 5000000,
    followerRequirement: 2000000,
    moneyPerSecond: 1200,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const tvchannelItem = gs.monetizationOptions.find((u) => u.id === "tv-channel")
      return !!(tvchannelItem && tvchannelItem.active)
    },
  },
}
