import { getRandomElement } from "./getRandomElement"
import { buildSentence } from "./buildSentence"
import { POST_SUBJECTS } from "../data/generated/subjects"
import { POST_VERBS } from "../data/generated/verbCategories"
import { POST_TARGETS } from "../data/generated/targetCategories"
import { verbTargetCompatibility } from "../data/generated/targetGroups"
import { PostWithHashTags } from "../types"
import { getRandomEngagement } from "./getRandomEngagement"

export const generateRandomConspiracyPost = (followers: number): PostWithHashTags | null => {
  try {
    const subject = getRandomElement(POST_SUBJECTS)
    const verbData = getRandomElement(POST_VERBS)
    const verbGerund = getRandomElement(verbData.verbs)

    const engagements = {
      comments: getRandomEngagement(followers, 0.2),
      retweets: getRandomEngagement(followers, 0.4),
      likes: getRandomEngagement(followers, 0.6),
    }

    const compatibleTargetTypes = verbTargetCompatibility[verbData.type]

    if (!compatibleTargetTypes || compatibleTargetTypes.length === 0) {
      console.warn(
        `No compatible target types defined for verb category: ${verbData.type}. Falling back.`
      )
      const anyTargetCategoryData = getRandomElement(POST_TARGETS)
      const target = getRandomElement(anyTargetCategoryData.targets)
      return buildSentence(subject, verbGerund, target, engagements)
    }

    const suitableTargetCategoriesData = POST_TARGETS.filter((tc) =>
      compatibleTargetTypes.includes(tc.type)
    )

    if (suitableTargetCategoriesData.length === 0) {
      console.warn(
        `No suitable target categories found in POST_TARGETS for verb category: ${verbData.type}. Falling back.`
      )
      const anyTargetCategoryData = getRandomElement(POST_TARGETS)
      const target = getRandomElement(anyTargetCategoryData.targets)
      return buildSentence(subject, verbGerund, target, engagements)
    }

    const targetCategoryData = getRandomElement(suitableTargetCategoriesData)
    const target = getRandomElement(targetCategoryData.targets)

    return buildSentence(subject, verbGerund, target, engagements)
  } catch (error) {
    console.error("Error generating conspiracy post:", error)
    return null
  }
}
