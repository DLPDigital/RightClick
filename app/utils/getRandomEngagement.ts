export function getRandomEngagement(followers: number, maxRatio: number): number {
  const max = Math.floor(followers * maxRatio)
  return Math.floor(Math.random() * (max + 1))
}
