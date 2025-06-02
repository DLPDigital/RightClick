import { PostSubject } from "../types"
import { getRandomHashtags } from "./getRandomHashtags"

export const buildSentence = (subject: PostSubject, verbGerund: string, target: string): string => {
  const hashtagCount = Math.floor(Math.random() * 7) + 3
  return `${subject.name} ${subject.plural ? "are" : "is"} ${verbGerund.toLowerCase()} ${target}. ${getRandomHashtags(hashtagCount)}`
}
