import type { Metadata } from "next"
import "./App.css"
import React from "react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Right Clicker",
  description: "A game about spreading conspiracies",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      <Script
          src="https://scripts.withcabin.com/hello.js"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
