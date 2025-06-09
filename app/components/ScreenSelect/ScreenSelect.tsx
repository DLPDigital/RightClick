import React from "react"
import { ScreenName } from "../../types"

import { navBar } from "./ScreenSelect.css"
import { Button } from "../Button"

interface ScreenSelectProps {
  currentScreen: ScreenName
  onNavigate: (screen: ScreenName) => void
}

const SCREENS: ScreenName[] = ["posting", "monetization", "upgrades", "achievements", "settings"]

export const ScreenSelect: React.FC<ScreenSelectProps> = ({ currentScreen, onNavigate }) => {
  return (
    <nav className={navBar}>
      {SCREENS.map((screen) => (
        <Button
          key={`${screen}-button`}
          onClick={() => onNavigate(screen)}
          isActive={currentScreen === screen}
        >
          {screen.charAt(0).toUpperCase() + screen.slice(1)}
        </Button>
      ))}
    </nav>
  )
}
