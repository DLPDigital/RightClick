import React from "react"

import { container } from "./AppContainer.css"

type Props = {
  children: React.ReactNode
}

export const AppContainer: React.FC<Props> = ({ children }) => {
  return <div className={container}>{children}</div>
}
