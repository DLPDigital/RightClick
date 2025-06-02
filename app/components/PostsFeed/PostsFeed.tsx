import React from "react"
import { GeneratedPost } from "../../types"

import { container, postsContainer, postContent } from "./PostsFeed.css"

type Props = {
  postsFeed: GeneratedPost[]
}

export const PostsFeed: React.FC<Props> = ({ postsFeed }) => (
  <div className={container}>
    <h3>Feed:</h3>
    <div className={postsContainer}>
      {postsFeed.length === 0 && <p>Start posting to see the theories fly!</p>}
      {postsFeed.map((post) => {
        console.log('post =', post)
        return (
        <div
          key={post.id}
          className={postContent}
        >
          <p>{post.content}</p>
          <span>{post.hashtags}</span>
        </div>
      )})}
    </div>
  </div>
)
