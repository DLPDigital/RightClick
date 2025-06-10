import { Upgrade } from "../types"

export const AVAILABLE_UPGRADES: Record<string, Upgrade> = {
  "faster-typing": {
    id: "faster-typing",
    name: "Faster Typing",
    description: "Type out those truths quicker!",
    baseCost: 10,
    costMultiplier: 1.15,
    level: 0,
    unlocked: true,
    followersPerClickBonus: 1,
  },
  "clickbait-headlines": {
    id: "clickbait-headlines",
    name: "Clickbait Headlines",
    description: "Lure them in with irresistible titles. Adds 5 followers per click",
    baseCost: 100,
    costMultiplier: 1.2,
    level: 0,
    unlocked: true,
    followersPerClickBonus: 5,
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
    description: 'They post while you "research". +1 follower/sec.',
    baseCost: 1,
    costMultiplier: 1.5,
    level: 0,
    maxLevel: 18,
    unlocked: true,
    passiveFollowersPerSecondBonus: 1,
    requirement: (gs) => gs.followers >= 10,
  },
  "Bot farm": {
    id: "bot-farm",
    name: "Hire a bot farm",
    description: "Move on from just interns to an entire bot farm",
    baseCost: 1200,
    costMultiplier: 1.8,
    level: 0,
    maxLevel: 3,
    unlocked: true,
    passiveFollowersPerSecondBonus: 10,
    requirement: (gs) => {
      const internArmyLevel = gs.upgrades.find((u) => u.id === "intern-army")
      return (internArmyLevel?.level ?? 0) >= 18
    },
  },
  // ... more upgrades: SEO, Bot Farm, Green Screen, Studio, etc.
}
