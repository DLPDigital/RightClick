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
    description:
      "Your cousin and his broccoli-top friends are slacking, we need more posts and posters. Hire out a bot farm to really get those posts going",
    baseCost: 50000,
    costMultiplier: 2,
    level: 0,
    maxLevel: 5,
    autoPostsPerSecondBonus: 20,
    unlocked: false,
    requirement: (gs) => {
      const internItem = gs.upgrades.find((u) => u.id === "intern-army")
      return !!(internItem && internItem.level >= 15)
    },
  },
  memecoin: {
    id: "memecoin",
    name: "Mint your own meme coins",
    description:
      "Someone popped up in your DMs saying they can mint you your own meme coin - GriftCoin, if you just give them some money. Purchasing unlocks selling meme coins.",
    baseCost: 40000000,
    costMultiplier: 1,
    level: 0,
    maxLevel: 1,
    autoPostsPerSecondBonus: 0,
    unlocked: false,
    requirement: (gs) => {
      const botFarmItem = gs.upgrades.find((u) => u.id === "botfarm")
      return !!(botFarmItem && botFarmItem.level >= 2)
    },
  },
  "trump-ticket": {
    id: "trump-ticket",
    name: "Meet President Trump",
    description:
      "The big man himself wants to meet you, well not just you but thousands of you, in an audience, at a rally. Grab a pic with him at the end for your profile pic!",
    baseCost: 75000,
    costMultiplier: 1,
    level: 0,
    maxLevel: 1,
    autoPostsPerSecondBonus: 40,
    unlocked: false,
    requirement: (gs) => {
      const botFarmItem = gs.upgrades.find((u) => u.id === "botfarm")
      return !!(botFarmItem && botFarmItem.level >= 3)
    },
  },
  "private-jet": {
    id: "private-jet",
    name: "Private Jet",
    description:
      "You can't be flying commercial with all the regular folk, it's not right. Invest in a PJ and hit the skies in style",
    baseCost: 5000000,
    costMultiplier: 1.5,
    level: 0,
    maxLevel: 3,
    autoPostsPerSecondBonus: 150,
    followersPerClickBonus: 20,
    unlocked: false,
    requirement: (gs) => {
      const memeCoinItem = gs.upgrades.find((u) => u.id === "memecoin")
      return !!(memeCoinItem && memeCoinItem.level >= 1)
    },
  },
  "whitehouse-press": {
    id: "whitehouse-press",
    name: "Whitehouse Press Pass",
    description:
      "The people need to hear straight from the horse's mouth, especially if it's full of horse paste. Buy a press pass to the Whitehouse and get your scoops direct",
    baseCost: 10000000,
    costMultiplier: 1,
    level: 0,
    maxLevel: 1,
    followersPerClickBonus: 100,
    unlocked: false,
    requirement: (gs) => {
      const privateJetItem = gs.upgrades.find((u) => u.id === "private-jet")
      return !!(privateJetItem && privateJetItem.level >= 2)
    },
  },
  "spotify-deal": {
    id: "spotify-deal",
    name: "Spotify Deal",
    description: "Sign a distribution deal with Spotify, stop being silenced!",
    baseCost: 100000000,
    costMultiplier: 1,
    level: 0,
    maxLevel: 1,
    autoPostsPerSecondBonus: 500,
    unlocked: false,
    requirement: (gs) => {
      const memeCoinItem = gs.upgrades.find((u) => u.id === "memecoin")
      return !!(memeCoinItem && memeCoinItem.level >= 1)
    },
  },
  "buyout-spotify": {
    id: "buyout-spotify",
    name: "Buyout Spotify",
    description:
      "You've outgrown Spotify, time to take it out of the hands of the corporate lefties",
    baseCost: 500000000,
    costMultiplier: 1,
    level: 0,
    maxLevel: 1,
    autoPostsPerSecondBonus: 2000,
    unlocked: false,
    requirement: (gs) => {
      const spotifyDealItem = gs.upgrades.find((u) => u.id === "spotify-deal")
      return !!(spotifyDealItem && spotifyDealItem.level >= 3)
    },
  },
  "delete-podcasts": {
    id: "delete-podcasts",
    name: "Cancel Lefty Podcasts",
    description:
      "These lefty podcasts want us censored and cancelled. Make sure they can't by deleting them all.",
    baseCost: 750000000,
    costMultiplier: 2,
    level: 0,
    maxLevel: 3,
    autoPostsPerSecondBonus: 4000,
    unlocked: false,
    requirement: (gs) => {
      const buyoutSpotifyItem = gs.upgrades.find((u) => u.id === "buyout-spotify")
      return !!(buyoutSpotifyItem && buyoutSpotifyItem.level >= 3)
    },
  },
  // "": {
  //   id: "",
  //   name: "",
  //   description: "",
  //   baseCost: ,
  //   costMultiplier: ,
  //   level: 0,
  //   maxLevel: ,
  //   autoPostsPerSecondBonus: ,
  //   followersPerClickBonus: ,
  //   unlocked: false,
  //   requirement: (gs) => {
  //     const Item = gs.upgrades.find((u) => u.id === "")
  //     return !!(Item && Item.level >= 3)
  //   },
  // },

  // ... more upgrades: SEO, Bot Farm, Green Screen, Studio, etc.
}
