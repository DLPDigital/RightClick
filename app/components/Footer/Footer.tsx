import React from "react"

import { container } from "./Footer.css"

const thisYear = new Date().getFullYear().toString()

export const Footer: React.FC = () => (
  <footer>
    <div className={container}>
      <p>v1.0</p>
      <p>© {thisYear} <br /><a
          href="/about"
          title="About RightClicker"
        >
          About
        </a></p>
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
