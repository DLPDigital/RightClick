export const getRandomElement = <T>(arr: T[]): T => {
  if (!arr || arr.length === 0) {
    throw new Error("Cannot select random element from an empty or undefined array.")
  }
  return arr[Math.floor(Math.random() * arr.length)]
}
