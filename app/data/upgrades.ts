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
    maxLevel: 10,
    unlocked: true,
    followersPerClickBonus: 0.5,
    requirement: (gs) => gs.followers >= 50,
  },
  "sock-puppet": {
    id: "sock-puppet",
    name: "Sock Puppet Accounts",
    description: "Post from multiple accounts, who'll know?",
    baseCost: 20,
    costMultiplier: 1.5,
    level: 0,
    maxLevel: 15,
    unlocked: true,
    postsPerClickBonus: 1,
    requirement: (gs) => gs.followers >= 1000,
  },
  "profile-pic": {
    id: "profile-pic",
    name: "Profile Pic",
    description:
      "Get a new headshot for your profile, your followers need to see how alpha you are",
    baseCost: 100,
    costMultiplier: 1,
    level: 0,
    maxLevel: 1,
    unlocked: true,
    followersPerClickBonus: 5,
    requirement: (gs) => {
      const headlinesItem = gs.upgrades.find((u) => u.id === "clickbait-headlines")
      return !!(headlinesItem && headlinesItem.level >= 4)
    },
  },
  "intern-army": {
    id: "intern-army",
    name: "Hire a Broccoli Top Intern",
    description:
      "Hire your little cousin and his friends to post for you, you're busy with your own research",
    baseCost: 1000,
    costMultiplier: 1.5,
    level: 0,
    maxLevel: 20,
    unlocked: false,
    autoPostsPerSecondBonus: 1,
    requirement: (gs) => gs.followers >= 2000,
  },
  dyor: {
    id: "dyor",
    name: "Do Your Own Research",
    description:
      "Click around stuff so fast you don't even have time to read it let alone understand it, who cares? Just share it!",
    baseCost: 10000,
    costMultiplier: 1.5,
    level: 0,
    maxLevel: 20,
    unlocked: false,
    autoPostsPerSecondBonus: 3,
    requirement: (gs) => gs.followers >= 10000,
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
  botfarm: {
    id: "botfarm",
    name: "Botfarm",
    description: "Your cousin and his broccoli-top friends are slacking, we need more posts and posters. Hire out a bot farm to really get those posts going",
    baseCost: 50000,
    costMultiplier: 2,
    level: 0,
    maxLevel: 5,
    autoPostsPerSecondBonus: 20,
    unlocked: false,
    requirement: (gs) => {
      const internItem = gs.upgrades.find((u) => u.id === "inter-army")
      return !!(internItem && internItem.level >= 15)
    }
  },
  // ... more upgrades: SEO, Bot Farm, Green Screen, Studio, etc.
}
