import React from "react"
import { formatNumber } from "../../utils/formatters"
import { Button } from "../Button"

import { container, tip } from "./Posting.css"
import { GeneratedPost } from "../../types"
import { PostsFeed } from "../PostsFeed"

interface PostingScreenProps {
  followers: number
  followersPerClick: number
  postsMade: number
  onPost: () => void
  postsFeed: GeneratedPost[]
  username: string
}

export const Posting: React.FC<PostingScreenProps> = ({
  followers,
  followersPerClick,
  postsMade,
  onPost,
  postsFeed,
  username,
}) => {
  return (
    <div className={container}>
      <h2>Spread the &ldquo;Truth&rdquo;!</h2>
      <p>Current Followers: {formatNumber(followers)}</p>
      <p>Followers per Post: {formatNumber(followersPerClick)}</p>
      <p>Total Posts Made: {formatNumber(postsMade)}</p>

      <Button onClick={onPost} isActive={true} disabled={false}>
        Post Conspiracy!
      </Button>

      <p className={tip}>
        Tip: The more you post, the deeper down the rabbit hole you go... and the more
        &ldquo;lucrative&rdquo; opportunities arise.
      </p>
      {postsFeed.length >= 0 && (
        <PostsFeed postsFeed={postsFeed} username={username} />
      )}
    </div>
  )
}
