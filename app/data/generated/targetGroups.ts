import { TargetCategoryType, VerbCategoryType } from "../../types"

export const verbTargetCompatibility: Record<VerbCategoryType, TargetCategoryType[]> = {
  destruction: ["locationGood", "thingGood", "abstractGood", "mediaGood"],
  control: ["locationGood", "thingGood", "abstractGood"],
  creation: ["locationBad", "thingBad", "abstractBad"],
  acquisition: ["thingBad", "abstractBad", "mediaGood"],
}
