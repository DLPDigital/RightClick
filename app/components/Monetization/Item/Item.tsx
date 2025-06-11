import React from "react"
import { formatNumber } from "../../../utils/formatters"
import { AvailableMonetizationDisplay } from "../../../hooks/useMonetization"
import { Button } from "../../Button"
import { DollarIcon } from "../../SVG"

import {
  container,
  iconContainer,
  contentContainer,
  content,
  buttonContainer,
  requirementsContainer,
  requirementsMissing,
} from "./Item.css"
import { vars } from "../../../theme/theme.css"

interface MonetizationItemProps {
  option: AvailableMonetizationDisplay
  money: number
  followers: number
  onActivate: (id: string) => void
}

export const MonetizationItem: React.FC<MonetizationItemProps> = ({
  option,
  money,
  followers,
  onActivate,
}) => {
  const handleActivateClick = () => {
    if (option.canActivate && !option.active) {
      onActivate(option.id)
    }
  }

  return (
    <div className={container}>
      <div className={iconContainer}>
        <DollarIcon fill={vars.color.secondary} />
      </div>
      <div className={contentContainer}>
        <div className={content}>
          <h3>{option.name}</h3>
          <p>{option.description}</p>
          <h4>Income: ${formatNumber(option.moneyPerSecond, true)}/sec</h4>
          <div className={requirementsContainer}>
            <h5>Requirements</h5>
            <div>
              <p>{formatNumber(option.followerRequirement)} followers</p>
              <p>|</p>
              <p>${formatNumber(option.costToActivate ?? 0)} cash</p>
            </div>
          </div>
        </div>
        <div className={buttonContainer}>
          {option.active ? (
            <p>✅ Activated</p>
          ) : (
            <>
              <Button onClick={handleActivateClick} disabled={!option.canActivate}>
                {option.canActivate ? "Activate" : "Requirements Not Met"}
              </Button>
              {!option.canActivate && (
                <div className={requirementsMissing}>
                  {money < option.costToActivate && (
                    <small>Need ${formatNumber(option.costToActivate - money)} more</small>
                  )}
                  {followers < option.followerRequirement && (
                    <small>
                      Need {formatNumber(option.followerRequirement - Math.floor(followers))} more
                      followers
                    </small>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
