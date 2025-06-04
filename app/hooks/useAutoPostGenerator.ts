import { useEffect, Dispatch } from "react"
import { GameAction } from "../reducers/gameReducer" // Or from types.ts
import { generateRandomConspiracyPost } from "../utils/postGenerator" // Adjust path
import { MAX_AUTO_POST_LEAD, POST_GENERATION_INTERVAL } from "../data/constants"
import { GeneratedPost } from "../types"

export const useAutoPostGenerator = (
  postsMade: number,
  postsFeedLength: number,
  dispatch: Dispatch<GameAction>
): void => {
  useEffect(() => {
    console.log("AUTO_POST_HOOK: Evaluating post generation interval setup.")

    const hasPlayerStartedPosting = postsMade > 0
    const isFeedNotTooFarAhead = postsFeedLength - postsMade < MAX_AUTO_POST_LEAD

    let intervalId: NodeJS.Timeout | undefined = undefined

    if (hasPlayerStartedPosting && isFeedNotTooFarAhead) {
      console.log("AUTO_POST_HOOK: Conditions met. Setting up post generation interval.")
      intervalId = setInterval(() => {
        const fullPostContentWithHashtags = generateRandomConspiracyPost()
        if (fullPostContentWithHashtags) {
          const newPost: GeneratedPost = {
            id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            timestamp: Date.now(),
            ...fullPostContentWithHashtags,
          }
          dispatch({ type: "ADD_TO_POST_FEED", payload: newPost })
        }
      }, POST_GENERATION_INTERVAL)
    } else {
      console.log(
        "AUTO_POST_HOOK: Conditions for post generation NOT met. Interval not started (or will be cleared)."
      )
    }

    return () => {
      if (intervalId) {
        console.log("AUTO_POST_HOOK: Clearing post generation interval.")
        clearInterval(intervalId)
      }
    }
  }, [dispatch, postsMade, postsFeedLength])

  // This hook doesn't need to return anything if it's purely for side effects.
}
