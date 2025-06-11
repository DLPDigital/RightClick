import { useEffect, Dispatch } from "react"
import { GameAction } from "../reducers/gameReducer"
import { generateRandomConspiracyPost } from "../utils/postGenerator"
import { POST_GENERATION_INTERVAL } from "../data/constants"
import { GeneratedPost } from "../types"

export const useAutoPostGenerator = (
  manualPostsMade: number,
  postsFeedLength: number,
  followers: number,
  postsGeneratedForFeed: number,
  dispatch: Dispatch<GameAction>
): void => {
  useEffect(() => {
    const hasPlayerStartedPosting = manualPostsMade > 0

    let intervalId: NodeJS.Timeout | undefined = undefined

    if (hasPlayerStartedPosting && manualPostsMade > postsGeneratedForFeed) {
      console.log(
        "AUTO_POST_HOOK: Conditions met. Setting up post generation interval. - 0",
        postsGeneratedForFeed
      )
      intervalId = setInterval(() => {
        const fullPostContentWithHashtags = generateRandomConspiracyPost(followers)
        if (fullPostContentWithHashtags) {
          const newPost: GeneratedPost = {
            id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            timestamp: Date.now(),
            ...fullPostContentWithHashtags,
          }
          dispatch({ type: "ADD_TO_POST_FEED", payload: newPost })
          dispatch({ type: "INCREMENT_POSTS_GENERATED_FOR_FEED" })
        }
      }, POST_GENERATION_INTERVAL)
    } else {
    }

    return () => {
      if (intervalId) {
        console.log("AUTO_POST_HOOK: Clearing post generation interval.")
        clearInterval(intervalId)
      }
    }
  }, [dispatch, manualPostsMade, postsFeedLength])
}
