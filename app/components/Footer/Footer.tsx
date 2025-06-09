import React from "react"

import { container } from "./Footer.css"

const thisYear = new Date().getFullYear().toString()

export const Footer: React.FC = () => (
  <footer>
    <div className={container}>
      <p>v1.0</p>
      <p>© {thisYear}</p>
      <p>
        <a
          href="https://github.com/DLPDigital/RightClick"
          target="_blank"
          rel="noreferrer"
          title="View on GitHub"
        >
          GitHub
        </a>
      </p>
    </div>
  </footer>
)
