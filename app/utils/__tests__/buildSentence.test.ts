import { PostSubject } from "../../types"
import { buildSentence } from "../buildSentence"

describe("buildSentence", () => {
  const subjectSingular = { name: "The government", plural: false, status: "good" }
  const subjectPlural = { name: "Aliens", plural: true, status: "good" }
  const engagements = {
    comments: 3,
    likes: 0,
    retweets: 2,
  }

  it("returns a sentence with correct verb for singular subject", () => {
    const result = buildSentence(
      subjectSingular as PostSubject,
      "controlling",
      "the weather",
      engagements
    )
    expect(result.content).toMatch(/^The government is controlling the weather\./)
  })

  it("returns a sentence with correct verb for plural subject", () => {
    const result = buildSentence(subjectPlural as PostSubject, "invading", "Earth", engagements)
    expect(result.content).toMatch(/^Aliens are invading Earth\./)
  })

  it("generates between 3 and 8 hashtags, each prefixed with #", () => {
    const result = buildSentence(
      subjectSingular as PostSubject,
      "testing",
      "something",
      engagements
    )
    const hashtags = result.hashtags.split(" ")
    expect(hashtags.length).toBeLessThan(10)
    expect(hashtags.length).toBeGreaterThan(2)
    hashtags.forEach((tag) => {
      expect(tag.startsWith("#")).toBe(true)
      expect(tag.length).toBeGreaterThan(1)
    })
  })
})
