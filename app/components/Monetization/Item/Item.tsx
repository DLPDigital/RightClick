import React from "react"
import { formatNumber } from "../../../utils/formatters"
import { AvailableMonetizationDisplay } from "../../../hooks/useMonetization"
import { Button } from "../../Button"

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
    <div className="item-card monetization-item">
      <h3>{option.name}</h3>
      <p>{option.description}</p>
      <p>Requires: {formatNumber(option.followerRequirement)} Followers</p>
      {option.costToActivate > 0 && <p>Activation Cost: ${formatNumber(option.costToActivate)}</p>}
      <p>Income: ${formatNumber(option.moneyPerSecond)}/sec</p>
      {option.active ? (
        <p className="status-active">✅ Activated</p>
      ) : (
        <>
          <Button onClick={handleActivateClick} disabled={!option.canActivate}>
            {option.canActivate ? "Activate" : "Requirements Not Met"}
          </Button>
          {!option.canActivate && (
            <div
              className="requirements-missing"
              style={{ fontSize: "0.9em", color: "#777", marginTop: "5px" }}
            >
              {money < option.costToActivate && (
                <div>
                  <small>Need ${formatNumber(option.costToActivate - money)} more</small>
                </div>
              )}
              {followers < option.followerRequirement && (
                <div>
                  <small>
                    Need {formatNumber(option.followerRequirement - Math.floor(followers))} more
                    followers
                  </small>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
