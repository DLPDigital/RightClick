import React from "react"
import { ScreenName } from "../../types"

import { navBar } from "./NavBar.css"

interface NavBarProps {
  currentScreen: ScreenName
  onNavigate: (screen: ScreenName) => void
}

const SCREENS: ScreenName[] = ["posting", "monetization", "upgrades", "achievements", "settings"]

export const NavBar: React.FC<NavBarProps> = ({ currentScreen, onNavigate }) => {
  return (
    <nav className={navBar}>
      {SCREENS.map((screen) => (
        <button
          key={screen}
          onClick={() => onNavigate(screen)}
          className={currentScreen === screen ? "active" : ""}
        >
          {screen.charAt(0).toUpperCase() + screen.slice(1)}
        </button>
      ))}
    </nav>
  )
}
