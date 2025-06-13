import React from "react"
import { HeartIcon, RetweetIcon, SpeechbubbleIcon, VerifiedIcon } from "../../SVG"
import Image from "next/image"

import {
  container,
  avatarContainer,
  avatarStyle,
  tweetContainer,
  userContainer,
  contentContainer,
  iconsContainer,
} from "./Post.css"
import { vars } from "../../../theme/theme.css"
import { AvatarType, PostWithHashTags } from "../../../types"
import { formatNumber } from "../../../utils/formatters"

type Props = {
  content: string
  hashtags: string
  username: string
  engagements: PostWithHashTags["engagements"]
  avatar: AvatarType
}

export const Post: React.FC<Props> = ({ content, hashtags, username, engagements, avatar }) => {
  const { comments, retweets, likes } = engagements
  const { filename, alt } = avatar
  return (
    <div className={container}>
      <div className={avatarContainer}>
        <div className={avatarStyle}>
          <Image
            src={`/images/avatars/${filename}`}
            alt={alt}
            title={filename}
            width="60"
            height="60"
          />
        </div>
      </div>
      <div className={tweetContainer}>
        <div className={userContainer}>
          <h4>@{username}</h4>
          <VerifiedIcon fill={vars.color.secondary} />
        </div>
        <div className={contentContainer}>
          {content} <span>{hashtags}</span>
        </div>
        <div className={iconsContainer}>
          <div>
            <SpeechbubbleIcon fill={vars.color.borderSecondary} />
            <span>{formatNumber(comments)}</span>
          </div>
          <div>
            <RetweetIcon fill={vars.color.borderSecondary} />
            <span>{formatNumber(retweets)}</span>
          </div>
          <div>
            <HeartIcon fill={vars.color.borderSecondary} />
            <span>{formatNumber(likes)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
