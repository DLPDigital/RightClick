import { Upgrade } from "../types"

export const AVAILABLE_UPGRADES: Record<string, Upgrade> = {
  // "test-upgrade": {
  //   id: "test-upgrade",
  //   name: "Test Upgrade",
  //   description: "This is a test upgrade for development purposes.",
  //   baseCost: 0,
  //   costMultiplier: 1.1,
  //   level: 0,
  //   maxLevel: 4,
  //   unlocked: true,
  //   autoPostsPerSecondBonus: 1,
  //   // passiveFollowersPerSecondBonus: 0.1,
  //   postsPerClickBonus: 5,
  //   requirement: (gs) => gs.followers >= 0,
  // },
  "faster-typing": {
    id: "faster-typing",
    name: "Faster Typing",
    description: "Type out those truths quicker!",
    baseCost: 10,
    costMultiplier: 1.15,
    level: 0,
    maxLevel: 5,
    unlocked: true,
    postsPerClickBonus: 0.25,
  },
  "clickbait-headlines": {
    id: "clickbait-headlines",
    name: "Clickbait Headlines",
    description: "Lure them in with irresistible titles.",
    baseCost: 100,
    costMultiplier: 1.2,
    level: 0,
    maxLevel: 5,
    unlocked: true,
    followersPerClickBonus: 0.5,
    requirement: (gs) => gs.followers >= 50,
  },
  "sock-puppet": {
    id: "sock-puppet",
    name: "sock-puppet",
    description: "Post from multiple accounts, who'll know?",
    baseCost: 20,
    costMultiplier: 1.5,
    level: 0,
    maxLevel: 10,
    unlocked: true,
    postsPerClickBonus: 1,
    requirement: (gs) => gs.followers >= 1000,
  },
  "intern-army": {
    id: "intern-army",
    name: "Hire an Intern",
    description: 'They post while you "research". +1 posts/sec.',
    baseCost: 1000,
    costMultiplier: 1.5,
    level: 0,
    unlocked: false,
    autoPostsPerSecondBonus: 1,
    requirement: (gs) => gs.followers >= 2000,
  },
  "podcast-mic": {
    id: "podcast-mic",
    name: "Buy a Podcast Mic",
    description:
      "Make sure your podcast mic can be as clear as possible, people need to hear you clearly, they can't be mistaking you.",
    baseCost: 20000,
    level: 0,
    maxLevel: 1,
    costMultiplier: 1,
    unlocked: false,
    passiveFollowersPerSecondBonus: 2,
    requirement: (gs) => {
      const podcastItem = gs.monetizationOptions.find((u) => u.id === "podcast")
      return !!(podcastItem && podcastItem.active)
    },
  },
  "green-screen": {
    id: "green-screen",
    name: "Buy a Greenscreen",
    description:
      "Your followers want to know where you are, get a green screen so you can tell them you're in the Whitehouse",
    baseCost: 20000,
    level: 0,
    maxLevel: 1,
    costMultiplier: 1,
    unlocked: false,
    passiveFollowersPerSecondBonus: 10,
    requirement: (gs) => {
      const youtubeItem = gs.monetizationOptions.find((u) => u.id === "youtube-channel")
      return !!(youtubeItem && youtubeItem.active)
    },
  },
  // ... more upgrades: SEO, Bot Farm, Green Screen, Studio, etc.
}
