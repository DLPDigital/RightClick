import type { Metadata } from "next"
import "./App.css"
import React from "react"

export const metadata: Metadata = {
  title: "Right Clicker",
  description: "A game about spreading conspiracies",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
