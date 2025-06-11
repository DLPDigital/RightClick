import { Upgrade } from "../types"

export const AVAILABLE_UPGRADES: Record<string, Upgrade> = {
  // "test-upgrade": {
  //   id: "test-upgrade",
  //   name: "Test Upgrade",
  //   description: "This is a test upgrade for development purposes.",
  //   baseCost: 0,
  //   costMultiplier: 1.1,
  //   level: 0,
  //   maxLevel: 10,
  //   unlocked: true,
  //   // autoPostsPerSecondBonus: 1,
  //   // passiveFollowersPerSecondBonus: 0.1,
  //   postsPerClickBonus: 5,
  //   requirement: (gs) => gs.followers >= 1,
  // },
  "faster-typing": {
    id: "faster-typing",
    name: "Faster Typing",
    description: "Type out those truths quicker! Add an extra post per click",
    baseCost: 10,
    costMultiplier: 1.15,
    level: 0,
    unlocked: true,
    postsPerClickBonus: 1,
  },
  "clickbait-headlines": {
    id: "clickbait-headlines",
    name: "Clickbait Headlines",
    description: "Lure them in with irresistible titles. Adds an extra 0.5 followers per click",
    baseCost: 100,
    costMultiplier: 1.2,
    level: 0,
    unlocked: true,
    followersPerClickBonus: 0.5,
    requirement: (gs) => gs.followers >= 50,
  },
  "basic-mic": {
    id: "basic-mic",
    name: "Basic Microphone",
    description: "Buy equipment for your podcast.",
    baseCost: 1000,
    costMultiplier: 1, // One-time purchase for now, or could upgrade quality
    level: 0,
    maxLevel: 1,
    unlocked: false,
    requirement: (gs) => gs.followers >= 500 && gs.money >= 1000,
  },
  podcasting: {
    id: "podcasting",
    name: "Launch your podcast",
    description: "Start your own podcast (very quietly).",
    baseCost: 1000,
    costMultiplier: 1, // One-time purchase for now, or could upgrade quality
    level: 0,
    maxLevel: 1,
    unlocked: false,
    unlocks: ["podcast-sponsorships"],
    requirement: (gs) => {
      const micUpgrade = gs.upgrades.find((u) => u.id === "basic-mic")
      return micUpgrade !== undefined && gs.followers >= 1000 && gs.money >= 20000
    },
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
  // ... more upgrades: SEO, Bot Farm, Green Screen, Studio, etc.
}
