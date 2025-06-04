import { POST_HASHTAGS } from "../../data/generated/hashtags"
import { getRandomHashtags } from "../getRandomHashtags"

describe("getRandomHashtags", () => {
  it("returns a string with the correct number of hashtags, all prefixed with #", () => {
    const result = getRandomHashtags(3)
    const tags = result.split(" ")
    expect(tags.length).toBe(3)
    tags.forEach((tag) => {
      expect(tag.startsWith("#")).toBe(true)
      // Remove the # and check it's a valid tag
      expect(POST_HASHTAGS).toContain(tag.slice(1))
    })
  })

  it("returns unique hashtags if possible", () => {
    const result = getRandomHashtags(POST_HASHTAGS.length)
    const tags = result.split(" ")
    const uniqueTags = new Set(tags)
    expect(uniqueTags.size).toBe(tags.length)
  })

  it("returns all hashtags if count >= POST_HASHTAGS.length", () => {
    const result = getRandomHashtags(POST_HASHTAGS.length + 5)
    const tags = result.split(" ")
    // Should not return more than available
    expect(tags.length).toBe(POST_HASHTAGS.length)
  })
})
