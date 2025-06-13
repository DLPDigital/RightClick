import React from "react"
import type { Metadata } from "next"

import { container } from "./about.css"

export const metadata: Metadata = {
  title: "About | Right Clicker",
  description: "About page for Right-Clicker. A game about spreading conspiracies",
}

const AboutPage: React.FC = () => (
  <div className={container}>
    <h1>About</h1>
    <p>
      Hi, welcome to Right Clicker, a game where you post your way to riches, much like real life
      really.
    </p>
    <p>
      I wish I didn&apos;t need to say this, but obviously all posts and anything else, including
      names, events and virtually everything else, are completely fictional and bear no resemblance
      to reality.
    </p>
    <h2>Tech</h2>
    <p>The game is built in Typescript using Next.js, the posts come from Contentful</p>
    <h2>Cookie Policy</h2>
    <p>We don't have one because we don't collect any. Basic anayltics are provided by <a href="https://withcabin.com/" target="_blank" rel="noreferrer" title="WithCabin">WithCabin</a>, a privacy first Google Analytics alternative.</p>
    <h2>Contact</h2>
    <p>If you want to get in touch, drop me a line here: right-clicker-game@proton.me</p>
    <p>Thanks for playing!</p>
    <p>
      <a href="/" title="Back to the game">
        Back to the game
      </a>
    </p>
  </div>
)

export default AboutPage
