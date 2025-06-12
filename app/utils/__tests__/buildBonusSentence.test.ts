import { buildBonusSentence } from "../buildBonusSentence"

describe("buildBonusSentence", () => {
  it('should return "No effect." when no bonuses are provided', () => {
    expect(buildBonusSentence({})).toBe("No effect.")
  })

  it("should return the correct sentence for one bonus", () => {
    expect(buildBonusSentence({ followersPerClickBonus: 5 })).toBe(
      "Increases Followers per Click by 5."
    )
    expect(buildBonusSentence({ postsPerClickBonus: 10 })).toBe("Increases Posts per Click by 10.")
    expect(buildBonusSentence({ autoPostsPerSecondBonus: 15 })).toBe(
      "Increases Posts per second by 15."
    )
    expect(buildBonusSentence({ passiveFollowersPerSecondBonus: 20 })).toBe(
      "Increases Followers per second by 20."
    )
  })

  it("should return the correct sentence for two bonuses", () => {
    expect(buildBonusSentence({ followersPerClickBonus: 5, postsPerClickBonus: 10 })).toBe(
      "Increases Followers per Click by 5 and Posts per Click by 10."
    )
    expect(buildBonusSentence({ postsPerClickBonus: 10, autoPostsPerSecondBonus: 15 })).toBe(
      "Increases Posts per Click by 10 and Posts per second by 15."
    )
    expect(
      buildBonusSentence({ autoPostsPerSecondBonus: 15, passiveFollowersPerSecondBonus: 20 })
    ).toBe("Increases Posts per second by 15 and Followers per second by 20.")
  })

  it("should return the correct sentence for three bonuses", () => {
    expect(
      buildBonusSentence({
        followersPerClickBonus: 5,
        postsPerClickBonus: 10,
        autoPostsPerSecondBonus: 15,
      })
    ).toBe("Increases Followers per Click by 5, Posts per Click by 10, and Posts per second by 15.")
    expect(
      buildBonusSentence({
        postsPerClickBonus: 10,
        autoPostsPerSecondBonus: 15,
        passiveFollowersPerSecondBonus: 20,
      })
    ).toBe(
      "Increases Posts per Click by 10, Posts per second by 15, and Followers per second by 20."
    )
  })

  it("should return the correct sentence for four bonuses", () => {
    expect(
      buildBonusSentence({
        followersPerClickBonus: 5,
        postsPerClickBonus: 10,
        autoPostsPerSecondBonus: 15,
        passiveFollowersPerSecondBonus: 20,
      })
    ).toBe(
      "Increases Followers per Click by 5, Posts per Click by 10, Posts per second by 15, and Followers per second by 20."
    )
  })

  it("should ignore bonuses with a value of 0", () => {
    expect(
      buildBonusSentence({
        followersPerClickBonus: 0,
        postsPerClickBonus: 0,
        autoPostsPerSecondBonus: 0,
        passiveFollowersPerSecondBonus: 0,
      })
    ).toBe("No effect.")
    expect(
      buildBonusSentence({
        followersPerClickBonus: 5,
        postsPerClickBonus: 0,
        autoPostsPerSecondBonus: 15,
        passiveFollowersPerSecondBonus: 0,
      })
    ).toBe("Increases Followers per Click by 5 and Posts per second by 15.")
  })
})
