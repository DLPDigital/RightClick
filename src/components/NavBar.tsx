import React from "react"
import { ScreenName } from "../types"

interface NavBarProps {
  currentScreen: ScreenName
  onNavigate: (screen: ScreenName) => void
}

const SCREENS: ScreenName[] = ["posting", "monetization", "upgrades", "achievements", "settings"]

const NavBar: React.FC<NavBarProps> = ({ currentScreen, onNavigate }) => {
  return (
    <nav>
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
export default NavBar
