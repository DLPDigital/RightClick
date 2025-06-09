import { getRandomEngagement } from "../getRandomEngagement"

describe("getRandomEngagement", () => {
  it("returns a number between 0 and maxRatio% of followers (inclusive)", () => {
    const followers = 147
    const maxRatio = 0.1
    const max = Math.floor(followers * maxRatio)
    for (let i = 0; i < 100; i++) {
      const result = getRandomEngagement(followers, maxRatio)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(max)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it("returns 0 when followers is 0", () => {
    expect(getRandomEngagement(0, 0.1)).toBe(0)
  })

  it("returns 0 when maxRatio is 0", () => {
    expect(getRandomEngagement(100, 0)).toBe(0)
  })
})
