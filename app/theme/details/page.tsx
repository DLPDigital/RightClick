"use client"
import React from "react"

import { container, colorContainer, colorBox } from "./details.css"
import { generateRandomConspiracyPost } from "../../utils/postGenerator"

const Details: React.FC = () => {
  for (let i = 1; i < 20; i++) {
    console.log(generateRandomConspiracyPost(10))
  }
  return (
    <div className={container}>
      <h1>Theme Page</h1>
      <h2>Colors</h2>
      <div className={colorContainer}>
        <div className={colorBox.primary}>
          <span className="invert">Primary</span>
        </div>
        <div className={colorBox.secondary}>
          <span>Secondary</span>
        </div>
        <div className={colorBox.tertiary}>
          <span className="invert">Tertiary</span>
        </div>
        <div className={colorBox.background}>
          <span className="invert">Background</span>
        </div>
        <div className={colorBox.foreground}>
          <span className="invert">Foreground</span>
        </div>
        <div className={colorBox.accent}>
          <span className="invert">Accent</span>
        </div>
        <div className={colorBox.highlight}>
          <span className="invert">Highlight</span>
        </div>
        <div className={colorBox.text}>
          <span>Text</span>
        </div>
        <div className={colorBox.mutedText}>
          <span className="invert">Muted Text</span>
        </div>
        <div className={colorBox.link}>
          <span className="invert">Link</span>
        </div>
        <div className={colorBox.border}>
          <span className="invert">Border</span>
        </div>
        <div className={colorBox.borderSecondary}>
          <span className="invert">Border Secondary</span>
        </div>
        <div className={colorBox.footerColor}>
          <span className="invert">Footer Color</span>
        </div>
        <div className={colorBox.warning}>
          <span className="invert">Warning</span>
        </div>
        <div className={colorBox.lightRed}>
          <span className="invert">Light Red</span>
        </div>
      </div>
    </div>
  )
}

export default Details
