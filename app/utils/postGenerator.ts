import { getRandomElement } from "./getRandomElement"
import { buildSentence } from "./buildSentence"
import { POST_SUBJECTS } from "../data/posting/subjects"
import { POST_VERBS } from "../data/posting/verbs"
import { POST_TARGETS, verbTargetCompatibility } from "../data/posting/targets"
import { PostWithHashTags } from "../types"

export const generateRandomConspiracyPost = (): PostWithHashTags | null => {
  try {
    const subject = getRandomElement(POST_SUBJECTS)
    const verbData = getRandomElement(POST_VERBS)
    const verbGerund = getRandomElement(verbData.verbs)

    const compatibleTargetTypes = verbTargetCompatibility[verbData.type]

    if (!compatibleTargetTypes || compatibleTargetTypes.length === 0) {
      console.warn(
        `No compatible target types defined for verb category: ${verbData.type}. Falling back.`
      )
      const anyTargetCategoryData = getRandomElement(POST_TARGETS)
      const target = getRandomElement(anyTargetCategoryData.targets)
      return buildSentence(subject, verbGerund, target)
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
      return buildSentence(subject, verbGerund, target)
    }

    const targetCategoryData = getRandomElement(suitableTargetCategoriesData)
    const target = getRandomElement(targetCategoryData.targets)

    return buildSentence(subject, verbGerund, target)
  } catch (error) {
    console.error("Error generating conspiracy post:", error)
    return null
  }
}
