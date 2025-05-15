import { InsanityStage } from "../types"

export const INSANITY_STAGES: InsanityStage[] = [
  { threshold: 0, name: "Normie", description: "Blissfully unaware." },
  { threshold: 10, name: "Slightly Curious", description: "Hmm, that's an interesting point..." },
  {
    threshold: 50,
    name: "Questioning the Narrative",
    description: "They wouldn't just LIE to us, would they?",
  },
  { threshold: 200, name: "Down the Rabbit Hole", description: "The patterns are everywhere!" },
  { threshold: 1000, name: "Red Pilled", description: "I see the strings!" },
  { threshold: 5000, name: "Chemtrail Spotter", description: "Those aren't contrails!" },
  { threshold: 20000, name: "Flat Earth Scholar", description: "The globe is a psyop!" },
  {
    threshold: 100000,
    name: "Lizard People Aware",
    description: "They walk among us, wearing skin-suits!",
  },
  {
    threshold: 500000,
    name: "Interdimensional Traveler",
    description: "The reptilians are just puppets for the Greys!",
  },
  { threshold: 1000000, name: "The One True Prophet", description: "I AM THE TRUTH!" },
]
