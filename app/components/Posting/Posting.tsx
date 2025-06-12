import React from "react"
import { Button } from "../Button"

import { container, content, tip } from "./Posting.css"
import { AvatarType, GeneratedPost } from "../../types"
import { PostsFeed } from "../PostsFeed"

interface PostingScreenProps {
  onPost: () => void
  postsFeed: GeneratedPost[]
  username: string
  avatar: AvatarType
}

export const Posting: React.FC<PostingScreenProps> = ({ onPost, postsFeed, username, avatar }) => {
  return (
    <div className={container}>
      <div className={content}>
        <h2>Spread the Truth!</h2>
        <Button onClick={onPost} isActive={true} disabled={false}>
          Post Conspiracy!
        </Button>
      </div>

      <p className={tip}>
        Tip: The more you post, the deeper down the rabbit hole you go... and the more
        &ldquo;lucrative&rdquo; opportunities arise.
      </p>
      {postsFeed.length >= 0 && (
        <PostsFeed postsFeed={postsFeed} username={username} avatar={avatar} />
      )}
    </div>
  )
}
