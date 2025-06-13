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
  "kids-book": {
    id: "kids-book",
    name: "Write a Kids' book",
    description:
      "Protect our children from all these nasty woke stories about drag queens and 'kindness'. Publish your child friendly story about how straight white men have actually been really persecuted for years.",
    costToActivate: 850000,
    followerRequirement: 1200000,
    moneyPerSecond: 750,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const youTubeChannelItem = gs.monetizationOptions.find((u) => u.id === "youtube-channel")
      return !!(youTubeChannelItem && youTubeChannelItem.active)
    },
  },
  newspaper: {
    id: "newspaper",
    name: "Start a newspaper",
    description:
      "Who said old media was dead? Not the way we do it, 17 issues a day, free for anyone who knows the handshake",
    costToActivate: 1000000,
    followerRequirement: 2000000,
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
    description:
      "We're broadcasting 24/7 in every nursing home in the world, those seniors aren't gonna radicalise themselves",
    costToActivate: 2500000,
    followerRequirement: 4000000,
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
    description:
      "We're making movies now, none of that woke stuff either. The hero always gets the girl, and she knows her place",
    costToActivate: 5000000,
    followerRequirement: 8000000,
    moneyPerSecond: 1200,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const tvchannelItem = gs.monetizationOptions.find((u) => u.id === "tv-channel")
      return !!(tvchannelItem && tvchannelItem.active)
    },
  },
  videogames: {
    id: "videogames",
    name: "Video Games",
    description:
      "We've had enough of our kids playing these super violent games like Grand Theft Auto where players kill cops on their wokestations. Buy our video games where the player hunts pink haired lefists with pet cats.",
    costToActivate: 7500000,
    followerRequirement: 12000000,
    moneyPerSecond: 2000,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const moviesItem = gs.monetizationOptions.find((u) => u.id === "making-movies")
      return !!(moviesItem && moviesItem.active)
    },
  },
  "internet-service": {
    id: "internet-service",
    name: "Internet Provider",
    description:
      "These communist corporates keep censoring our voices! Put a stop to that with our own ISP.",
    costToActivate: 10000000,
    followerRequirement: 15000000,
    moneyPerSecond: 5000,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const videoGamesItem = gs.monetizationOptions.find((u) => u.id === "video-games")
      return !!(videoGamesItem && videoGamesItem.active)
    },
  },
  vaccines: {
    id: "vaccines",
    name: "Get Vaccinated - AGAINST Vaccinations",
    description:
      "No more vaxxes for your supports. Take this one tablet and it will render all big pharma poison completely inert (any similarities to flea powder are coincidental).",
    costToActivate: 15000000,
    followerRequirement: 25000000,
    moneyPerSecond: 6000,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const internetServiceItem = gs.monetizationOptions.find((u) => u.id === "internet-service")
      return !!(internetServiceItem && internetServiceItem.active)
    },
  },
  "personal-appearances": {
    id: "personal-appearances",
    name: "Personal Appearances",
    description:
      "The people want to see you! Agree to show up to their divorce parties and firings and sell selfies!",
    costToActivate: 20000000,
    followerRequirement: 50000000,
    moneyPerSecond: 8000,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const vaccinesItem = gs.monetizationOptions.find((u) => u.id === "vaccines")
      return !!(vaccinesItem && vaccinesItem.active)
    },
  },
  autographs: {
    id: "autographs",
    name: "Autographs",
    description:
      "Sell your followers signed autographs, it'll prove to their families they're really friends with you",
    costToActivate: 40000000,
    followerRequirement: 75000000,
    moneyPerSecond: 10000,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const personalAppearancesItem = gs.monetizationOptions.find(
        (u) => u.id === "personal-appearances"
      )
      return !!(personalAppearancesItem && personalAppearancesItem.active)
    },
  },
  "meme-coin": {
    id: "meme-coin",
    name: "Meme Coin",
    description:
      "You knew it was coming. Everyone is doing it, why shouldn't you? Sell GriftCoin to your followers. It's totally not a rug pull you guys. Requires the Meme Coin Upgrade.",
    costToActivate: 80000000,
    followerRequirement: 85000000,
    moneyPerSecond: 25000,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const autographsItem = gs.monetizationOptions.find((u) => u.id === "autographs")
      const memeCoinUpgrade = gs.upgrades.find((u) => u.id === "memecoin")
      return !!(
        autographsItem &&
        autographsItem.active &&
        memeCoinUpgrade &&
        memeCoinUpgrade.level >= 0
      )
    },
  },
  "trump-pics": {
    id: "trump-pics",
    name: "Signed pics of you and President Trump",
    description:
      "You met the Donald, GEOTUS Trump. It was at a rally sure, but he stuck his thumb at you and glanced in your direction during his totally not weird dance. Your followers will want a picture of that. Requires the Trump Ticket upgrade.",
    costToActivate: 100000000,
    followerRequirement: 100000000,
    moneyPerSecond: 30000,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const autographsItem = gs.monetizationOptions.find((u) => u.id === "autographs")
      const trumpTicketUpgrade = gs.upgrades.find((u) => u.id === "trump-ticket")
      return !!(
        autographsItem &&
        autographsItem.active &&
        trumpTicketUpgrade &&
        trumpTicketUpgrade.level >= 0
      )
    },
  },
  "rogan-appearance": {
    id: "rogan-appearance",
    name: "Experience Joe Rogan",
    description:
      "He's been hearing all about your totally awesome work, now you get to go on Rogan, smoke cigars and set the world straight with your facts",
    costToActivate: 200000000,
    followerRequirement: 125000000,
    moneyPerSecond: 40000,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const trumpPicsItem = gs.monetizationOptions.find((u) => u.id === "trump-pics")
      return !!(trumpPicsItem && trumpPicsItem.active)
    },
  },
  tour: {
    id: "tour",
    name: "Go on Tour with Mike Flynn",
    description: "It's about time you and your truths hit the road, along with Gen. Mike Flynn",
    costToActivate: 300000000,
    followerRequirement: 150000000,
    moneyPerSecond: 50000,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const trumpPicsItem = gs.monetizationOptions.find((u) => u.id === "trump-pics")
      return !!(trumpPicsItem && trumpPicsItem.active)
    },
  },
  "world-tour": {
    id: "world-tour",
    name: "World Tour",
    description: "Forget Mike Flynn, he's weird. You've outgrown him. Hit the skies",
    costToActivate: 400000000,
    followerRequirement: 300000000,
    moneyPerSecond: 75000,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const tourItem = gs.monetizationOptions.find((u) => u.id === "tour")
      const privateJetUpgrade = gs.upgrades.find((u) => u.id === "private-jet")
      return !!(tourItem && tourItem.active && privateJetUpgrade && privateJetUpgrade.level >= 1)
    },
  },
  "whitehouse-pens": {
    id: "whitehouse-pens",
    name: "Whitehouse Pens",
    description:
      "Sell pens you've, not stolen, but taken from the Whitehouse with your press pass. Requires Whitehouse Press Pass",
    costToActivate: 500000000,
    followerRequirement: 300000000,
    moneyPerSecond: 80000,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const roganAppearanceItem = gs.monetizationOptions.find((u) => u.id === "rogan-appearance")
      const whitehousePassUpgrade = gs.upgrades.find((u) => u.id === "whitehouse-press")
      return !!(
        roganAppearanceItem &&
        roganAppearanceItem.active &&
        whitehousePassUpgrade &&
        whitehousePassUpgrade.level >= 1
      )
    },
  },
  "talking-head": {
    id: "talking-head",
    name: "Fox Talking Head",
    description:
      "Go on Fox to be a 'commentator' on some of the biggest 'news' shows. Don't hold back!",
    costToActivate: 600000000,
    followerRequirement: 0,
    moneyPerSecond: 100000,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const roganAppearanceItem = gs.monetizationOptions.find((u) => u.id === "rogan-appearance")
      return !!(roganAppearanceItem && roganAppearanceItem.active)
    },
  },
  "fox-show": {
    id: "fox-show",
    name: "Host your own Fox Show",
    description:
      "It's not enough to just be on someone else's show, Rupert is giving you your own!",
    costToActivate: 0,
    followerRequirement: 500000000,
    moneyPerSecond: 150000,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const talkingHeadItem = gs.monetizationOptions.find((u) => u.id === "talking-head")
      return !!(talkingHeadItem && talkingHeadItem.active)
    },
  },
  "office-run": {
    id: "office-run",
    name: "Run for Office",
    description:
      "It's time to put your plans into action, declare your run for office. You'll need money for your campaign obviously. Requires Spotify ownership",
    costToActivate: 1000000000,
    followerRequirement: 1500000000,
    moneyPerSecond: 300000,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const foxShowItem = gs.monetizationOptions.find((u) => u.id === "fox-show")
      const spotifyBuyoutUpgrade = gs.upgrades.find((u) => u.id === "buyout-spotify")
      return !!(
        foxShowItem &&
        foxShowItem.active &&
        spotifyBuyoutUpgrade &&
        spotifyBuyoutUpgrade.level >= 1
      )
    },
  },
  curriculum: {
    id: "curriculum",
    name: "Set the Curriculum",
    description:
      "Our schools are teaching kids wrong, they don't know words, hardly any words. Make sure they learn correctly by making sure every child has a copy of your book.",
    costToActivate: 1200000000,
    followerRequirement: 1750000000,
    moneyPerSecond: 400000,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const kidsBookItem = gs.monetizationOptions.find((u) => u.id === "kids-book")
      const officeRunItem = gs.monetizationOptions.find((u) => u.id === "office-run")
      return !!(kidsBookItem && kidsBookItem.active && officeRunItem && officeRunItem.active)
    },
  },
  "presidential-run": {
    id: "presidential-run",
    name: "Run for President",
    description:
      "You've been in office now for a hot minute, you're ready for the stepup to the big time. President Trump will endorse you as his successor for the low low price of just a few measly tens of billions",
    costToActivate: 50000000000,
    followerRequirement: 3000000000,
    moneyPerSecond: 1000000,
    active: false,
    unlocked: false,
    requirement: (gs) => {
      const officeRunItem = gs.monetizationOptions.find((u) => u.id === "office-run")
      return !!(officeRunItem && officeRunItem.active)
    },
  },
  // "": {
  //   id: "",
  //   name: "",
  //   description: "",
  //   costToActivate: ,
  //   followerRequirement: ,
  //   moneyPerSecond: ,
  //   active: false,
  //   unlocked: false,
  //   requirement: (gs) => {
  //     const Item = gs.monetizationOptions.find((u) => u.id === "")
  //     return !!(Item && Item.active)
  //   },
  // },
  // "": {
  //   id: "",
  //   name: "",
  //   description: "",
  //   costToActivate: ,
  //   followerRequirement: ,
  //   moneyPerSecond: ,
  //   active: false,
  //   unlocked: false,
  //   requirement: (gs) => {
  //     const Item = gs.monetizationOptions.find((u) => u.id === "")
  //     return !!(Item && Item.active)
  //   },
  // },
  // "": {
  //   id: "",
  //   name: "",
  //   description: "",
  //   costToActivate: ,
  //   followerRequirement: ,
  //   moneyPerSecond: ,
  //   active: false,
  //   unlocked: false,
  //   requirement: (gs) => {
  //     const Item = gs.monetizationOptions.find((u) => u.id === "")
  //     return !!(Item && Item.active)
  //   },
  // },
  // "": {
  //   id: "",
  //   name: "",
  //   description: "",
  //   costToActivate: ,
  //   followerRequirement: ,
  //   moneyPerSecond: ,
  //   active: false,
  //   unlocked: false,
  //   requirement: (gs) => {
  //     const Item = gs.monetizationOptions.find((u) => u.id === "")
  //     return !!(Item && Item.active)
  //   },
  // },
}
