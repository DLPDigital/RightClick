import { PostSubject, PostWithHashTags } from "../types"
import { getRandomHashtags } from "./getRandomHashtags"

export const buildSentence = (
  subject: PostSubject,
  verbGerund: string,
  target: string,
  engagements: PostWithHashTags["engagements"]
): PostWithHashTags => {
  const hashtagCount = Math.floor(Math.random() * 7) + 3
  return {
    content: `${subject.name} ${subject.plural ? "are" : "is"} ${verbGerund.toLowerCase()} ${target}.`,
    hashtags: getRandomHashtags(hashtagCount),
    engagements
  }
}
