import React from "react"

import { container } from "./ComponentContainer.css"

type Props = {
  children: React.ReactNode
}

export const ComponentContainer: React.FC<Props> = ({ children }) => {
  return <div className={container}>{children}</div>
}
