import { generateRandomConspiracyPost } from "../postGenerator"
import * as getRandomElementModule from "../getRandomElement"

describe("generateRandomConspiracyPost", () => {
  it("returns a non-empty string", () => {
    const result = generateRandomConspiracyPost()
    expect(typeof result).toBe("object")
    expect(result).not.toBeNull()
    expect(result && result.content.length).toBeGreaterThan(0)
  })

  it("returns a string with a verb, target, and hashtags", () => {
    const result = generateRandomConspiracyPost()
    expect(result?.content).toMatch(/\bis\b|\bare\b/) // contains 'is' or 'are'
    expect(result?.hashtags).toMatch(/#\w+/) // contains at least one hashtag
    expect(result?.content).toMatch(/\./) // contains a period
  })

  it("returns null if an error occurs (simulate by mocking getRandomElement)", () => {
    const original = jest.requireActual("../getRandomElement").getRandomElement
    jest.spyOn(getRandomElementModule, "getRandomElement").mockImplementation(() => {
      throw new Error("fail")
    })
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {}) // suppress error
    const result = generateRandomConspiracyPost()
    expect(result).toBeNull()
    consoleErrorSpy.mockRestore() // restore after test
    jest.spyOn(getRandomElementModule, "getRandomElement").mockImplementation(original)
  })
})
