import React from "react"
import { GeneratedPost } from "../../types"

import { container, postsContainer } from "./PostsFeed.css"
import { Post } from "./Post"

type Props = {
  postsFeed: GeneratedPost[]
  username: string
}

export const PostsFeed: React.FC<Props> = ({ postsFeed, username }) => (
  <div className={container}>
    <h3>Posts</h3>
    <div className={postsContainer}>
      {postsFeed.length === 0 && <p>Start posting to see the theories fly!</p>}
      {postsFeed.map((post) => {
        return (
          <Post
            key={post.id}
            content={post.content}
            hashtags={post.hashtags}
            username={username}
            engagements={post.engagements}
          />
        )
      })}
    </div>
  </div>
)
