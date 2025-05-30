import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Monetization } from "./Monetization"
import { AvailableMonetizationDisplay } from "../../hooks/useMonetization"

describe("Monetization", () => {
  const mockOptions: AvailableMonetizationDisplay[] = [
    {
      id: "mon1",
      active: false,
      name: "Ad Revenue",
      description: "Earn money from ads.",
      costToActivate: 50,
      moneyPerSecond: 5,
      followerRequirement: 100,
      canActivate: true,
    },
    {
      id: "mon2",
      active: false,
      name: "Sponsored Post",
      description: "Get paid for sponsored content.",
      costToActivate: 50,
      moneyPerSecond: 5,
      followerRequirement: 100,
      canActivate: true,
    },
  ]

  it("renders monetization options and stats", () => {
    const handleActivate = jest.fn()
    const { getByText } = render(
      <Monetization
        availableMonetization={mockOptions}
        onActivateMonetization={handleActivate}
        currentMoney={123.45}
        currentFollowers={321}
      />
    )
    expect(getByText(/Grift & Monetize/i)).toBeInTheDocument()
    expect(getByText(/Current: \$123.45, Followers: 321/)).toBeInTheDocument()
    expect(getByText(/Ad Revenue/i)).toBeInTheDocument()
    expect(getByText(/Sponsored Post/i)).toBeInTheDocument()
  })

  it("shows message when no monetization options are available", () => {
    const { getByText } = render(
      <Monetization
        availableMonetization={[]}
        onActivateMonetization={jest.fn()}
        currentMoney={0}
        currentFollowers={0}
      />
    )
    expect(getByText(/No monetization options available yet/i)).toBeInTheDocument()
  })
})
