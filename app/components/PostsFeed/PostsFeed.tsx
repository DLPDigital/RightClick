import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AvatarType, GeneratedPost } from "../../types"
import { Post } from "./Post"

import { container, postsContainer } from "./PostsFeed.css"

type Props = {
  postsFeed: GeneratedPost[]
  username: string
  avatar: AvatarType
}

export const PostsFeed: React.FC<Props> = ({ postsFeed, username, avatar }) => (
  <div className={container}>
    <h3>Posts</h3>
    <div className={postsContainer}>
      {postsFeed.length === 0 && <p>Start posting to see the theories fly!</p>}
      <AnimatePresence initial={false}>
        {postsFeed.map((post) => {
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              style={{ width: "100%" }}
            >
              <Post
                key={post.id}
                content={post.content}
                hashtags={post.hashtags}
                username={username}
                engagements={post.engagements}
                avatar={avatar}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  </div>
)
