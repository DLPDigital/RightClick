import React from "react"
import { render, screen } from "@testing-library/react"
import { StatusBar } from "./StatusBar"

describe("StatusBar", () => {
  it("renders all stats with correct values", () => {
    render(
      <StatusBar
        money={12345}
        moneyPerSecond={67}
        followers={215}
        postsMade={42}
        followersPerSecond={3}
      />
    )

    // Check labels
    expect(screen.getByText(/Posts/i)).toBeInTheDocument()
    expect(screen.getByText(/Followers/i)).toBeInTheDocument()
    expect(screen.getByText(/Money/i)).toBeInTheDocument()

    // Check formatted values
    expect(screen.getByText("42")).toBeInTheDocument() // postsMade
    expect(screen.getByText("215")).toBeInTheDocument() // followers
    expect(screen.getByText("$12.35K")).toBeInTheDocument() // money
    expect(screen.getByText("$67.00 p/s")).toBeInTheDocument() // moneyPerSecond
  })
})
