import React from "react"

import { activeButton } from "./Button.css"

type Props = {
  children: React.ReactNode
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
}

export const Button: React.FC<Props> = ({ children, onClick, isActive, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={isActive ? activeButton.Active : activeButton.Default}
  >
    {children}
  </button>
)
