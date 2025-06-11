import React from "react"
import { DollarIcon, PostIcon, SheepIcon } from "../../SVG"
import { vars } from "../../../theme/theme.css"

import { container, iconContainer, contentContainer, totalNum, rateNum, numbers } from "./Stat.css"

type Props = {
  icon: "followers" | "money" | "posts"
  total: number | string
  rate: number | string
  label: string
  perClick?: number
}

const getIcon = (icon: string) => {
  switch (icon) {
    case "followers":
      return <SheepIcon fill={vars.color.secondary} />
    case "money":
      return <DollarIcon fill={vars.color.secondary} />
    case "posts":
      return <PostIcon fill={vars.color.secondary} />
    default:
      return <PostIcon fill={vars.color.secondary} />
  }
}

export const Stat: React.FC<Props> = ({ icon, total, rate, label, perClick }) => {
  return (
    <div className={container}>
      <div className={iconContainer}>{getIcon(icon)}</div>
      <div className={contentContainer}>
        <p className={totalNum}>{total}</p>
        <div className={numbers}>
          <h5>{label}</h5>
          <div>
            <p className={rateNum} title="Per Second">
              {rate} p/s
            </p>
            {perClick && (
              <p className={rateNum} title="Per Click">
                {perClick} p/c
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
