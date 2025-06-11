import React from "react"
import { ScreenName } from "../../types"

import { navBar } from "./NavBar.css"
import { Button } from "../Button"
import { IntroModal } from "../IntroModal"

interface NavBarProps {
  currentScreen: ScreenName
  onNavigate: (screen: ScreenName) => void
  onPost: () => void
}

const SCREENS: ScreenName[] = ["posting", "grifting", "upgrades", "clout", "settings"]

export const NavBar: React.FC<NavBarProps> = ({ currentScreen, onNavigate, onPost }) => (
  <>
    <IntroModal />
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
      <Button onClick={onPost} isActive={false} disabled={false}>
        Post
      </Button>
    </nav>
  </>
)
