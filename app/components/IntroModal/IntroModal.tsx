import React from "react"

import { container, header, iconContainer } from "./IntroModal.css"
import Image from "next/image"

export const IntroModal: React.FC = () => (
  <div className={container}>
    <div className={header}>
      <h1>
        Right
        <br />
        Clicker
      </h1>
    </div>
    <div className={iconContainer}>
      <Image
        src="/images/red-pill-icon.png"
        alt="Take the Red Pill"
        title="red-pill-icon.png"
        width="72"
        height="90"
      />
    </div>
  </div>
)
