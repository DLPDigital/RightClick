import { generateRandomConspiracyPost } from "../postGenerator"

describe("generateRandomConspiracyPost", () => {
  it("returns a non-empty string", () => {
    const result = generateRandomConspiracyPost()
    expect(typeof result).toBe("string")
    expect(result).not.toBeNull()
    expect(result && result.length).toBeGreaterThan(0)
  })

  it("returns a string with a verb, target, and hashtags", () => {
    const result = generateRandomConspiracyPost()
    expect(result).toMatch(/\bis\b|\bare\b/) // contains 'is' or 'are'
    expect(result).toMatch(/#\w+/) // contains at least one hashtag
    expect(result).toMatch(/\./) // contains a period
  })

  it("returns null if an error occurs (simulate by mocking getRandomElement)", () => {
    const original = jest.requireActual("../getRandomElement").getRandomElement
    jest.spyOn(require("../getRandomElement"), "getRandomElement").mockImplementation(() => {
      throw new Error("fail")
    })
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {}) // suppress error
    const result = generateRandomConspiracyPost()
    expect(result).toBeNull()
    consoleErrorSpy.mockRestore() // restore after test
    jest.spyOn(require("../getRandomElement"), "getRandomElement").mockImplementation(original)
  })
})
