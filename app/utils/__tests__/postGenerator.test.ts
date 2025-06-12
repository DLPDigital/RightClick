import { generateRandomConspiracyPost } from "../postGenerator"
import * as getRandomElementModule from "../getRandomElement"
import * as getRandomNumberModule from "../getRandomNumber"

describe("generateRandomConspiracyPost", () => {
  it("returns a non-empty string", () => {
    const result = generateRandomConspiracyPost(20)
    expect(typeof result).toBe("object")
    expect(result).not.toBeNull()
    expect(result && result.content.length).toBeGreaterThan(0)
  })

  it("returns a string with a verb, target, and hashtags when not using RANDOM_POSTS", () => {
    const originalGetRandomNumber = getRandomNumberModule.getRandomNumber
    jest.spyOn(getRandomNumberModule, "getRandomNumber").mockReturnValue(50) // Ensure RANDOM_POSTS path is not taken

    const result = generateRandomConspiracyPost(20)
    expect(result?.content).toMatch(/\bis\b|\bare\b/) // contains 'is' or 'are'
    expect(result?.hashtags).toMatch(/#\w+/) // contains at least one hashtag
    expect(result?.content).toMatch(/\./) // contains a period

    jest.spyOn(getRandomNumberModule, "getRandomNumber").mockImplementation(originalGetRandomNumber)
  })

  it("returns a random post from RANDOM_POSTS when condition is met", () => {
    const originalGetRandomNumber = getRandomNumberModule.getRandomNumber
    jest.spyOn(getRandomNumberModule, "getRandomNumber").mockReturnValue(96) // Ensure RANDOM_POSTS path IS taken

    // We also need to mock getRandomElement to control what RANDOM_POSTS returns for a predictable test
    const originalGetRandomElement = getRandomElementModule.getRandomElement
    jest.spyOn(getRandomElementModule, "getRandomElement").mockReturnValueOnce("This is a random post from RANDOM_POSTS.")

    const result = generateRandomConspiracyPost(20)
    expect(result).toEqual({
      content: "This is a random post from RANDOM_POSTS.",
      hashtags: "",
      engagements: expect.any(Object),
    })

    // Restore the original implementations
    jest.spyOn(getRandomNumberModule, "getRandomNumber").mockImplementation(originalGetRandomNumber)
    jest.spyOn(getRandomElementModule, "getRandomElement").mockImplementation(originalGetRandomElement)
  })

  it("returns null if an error occurs (simulate by mocking getRandomElement)", () => {
    const original = jest.requireActual("../getRandomElement").getRandomElement
    jest.spyOn(getRandomElementModule, "getRandomElement").mockImplementation(() => {
      throw new Error("fail")
    })
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {}) // suppress error
    const result = generateRandomConspiracyPost(20)
    expect(result).toBeNull()
    consoleErrorSpy.mockRestore() // restore after test
    jest.spyOn(getRandomElementModule, "getRandomElement").mockImplementation(original)
  })
})
