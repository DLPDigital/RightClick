interface BuildBonusSentenceArgs {
  followersPerClickBonus?: number
  postsPerClickBonus?: number
  autoPostsPerSecondBonus?: number
  passiveFollowersPerSecondBonus?: number
}

export const buildBonusSentence = ({
  followersPerClickBonus,
  postsPerClickBonus,
  autoPostsPerSecondBonus,
  passiveFollowersPerSecondBonus,
}: BuildBonusSentenceArgs): string => {
  const effects: string[] = []

  if (followersPerClickBonus && followersPerClickBonus > 0) {
    effects.push(`Followers per Click to ${followersPerClickBonus}`)
  }
  if (postsPerClickBonus && postsPerClickBonus > 0) {
    effects.push(`Posts per Click to ${postsPerClickBonus}`)
  }
  if (autoPostsPerSecondBonus && autoPostsPerSecondBonus > 0) {
    effects.push(`Posts per second to ${autoPostsPerSecondBonus}`)
  }
  if (passiveFollowersPerSecondBonus && passiveFollowersPerSecondBonus > 0) {
    effects.push(`Followers per second to ${passiveFollowersPerSecondBonus}`)
  }

  if (effects.length === 0) {
    return "No effect."
  }

  let sentence = "Increases "
  if (effects.length === 1) {
    sentence += effects[0]
  } else if (effects.length === 2) {
    sentence += `${effects[0]} and ${effects[1]}`
  } else {
    sentence += effects.slice(0, -1).join(", ")
    sentence += `, and ${effects[effects.length - 1]}`
  }

  return `${sentence}.`
}
