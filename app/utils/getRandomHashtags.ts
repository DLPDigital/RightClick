import { POST_HASHTAGS } from "../data/posting/hashtags"

export const getRandomHashtags = (count: number): string => {
  const shuffled = [...POST_HASHTAGS]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
    .slice(0, count)
    .map((tag) => `#${tag}`)
    .join(" ")
}
