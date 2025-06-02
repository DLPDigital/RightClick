import { buildSentence } from "../buildSentence"

describe("buildSentence", () => {
  const subjectSingular = { name: "The government", plural: false }
  const subjectPlural = { name: "Aliens", plural: true }

  it("returns a sentence with correct verb for singular subject", () => {
    const result = buildSentence(subjectSingular, "controlling", "the weather")
    expect(result).toMatch(/^The government is controlling the weather\./)
  })

  it("returns a sentence with correct verb for plural subject", () => {
    const result = buildSentence(subjectPlural, "invading", "Earth")
    expect(result).toMatch(/^Aliens are invading Earth\./)
  })

  it("appends between 3 and 8 hashtags, each prefixed with #", () => {
    const result = buildSentence(subjectSingular, "testing", "something")
    const hashtags = result.split(". ")[1].split(" ")
    expect(hashtags.length).toBeLessThan(9)
    expect(hashtags.length).toBeGreaterThan(2)
    hashtags.forEach((tag) => {
      expect(tag.startsWith("#")).toBe(true)
      expect(tag.length).toBeGreaterThan(1)
    })
  })
})
