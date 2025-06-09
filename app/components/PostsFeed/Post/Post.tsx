import React from "react"
import { Heart, Retweet, Speechbubble, Verified } from "../../SVG"
import Image from "next/image"

import {
  container,
  avatarContainer,
  avatar,
  tweetContainer,
  userContainer,
  contentContainer,
  iconsContainer,
} from "./Post.css"
import { vars } from "../../../theme/theme.css"
import { PostWithHashTags } from "../../../types"

type Props = {
  content: string
  hashtags: string
  username: string
  engagements: PostWithHashTags["engagements"]
}

export const Post: React.FC<Props> = ({ content, hashtags, username, engagements }) => {
  const { comments, retweets, likes } = engagements
  return (
    <div className={container}>
      <div className={avatarContainer}>
        <div className={avatar}>
          <Image
            src="/images/red-pill-icon.png"
            alt="Take the Red Pill"
            title="red-pill-icon.png"
            width="30"
            height="40"
          />
        </div>
      </div>
      <div className={tweetContainer}>
        <div className={userContainer}>
          <h4>@{username}</h4>
          <Verified fill={vars.color.secondary} />
        </div>
        <div className={contentContainer}>
          {content}{" "}
          <span>{hashtags}</span>
        </div>
        <div className={iconsContainer}>
          <div>
            <Speechbubble fill={vars.color.borderSecondary} />
            <span>{comments}</span>
          </div>
          <div>
            <Retweet fill={vars.color.borderSecondary} />
            <span>{retweets}</span>
          </div>
          <div>
            <Heart fill={vars.color.borderSecondary} />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
