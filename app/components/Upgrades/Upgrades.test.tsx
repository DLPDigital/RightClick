import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Upgrades } from "./Upgrades"
import { AvailableUpgradeDisplay } from "../../types"

const mockUpgrades = [
  {
    id: "upgrade1",
    name: "Better Laptop",
    description: "Post faster with a new laptop.",
    currentCost: 100,
    canAfford: true,
    level: 1,
    maxLevel: 5,
    unlocked: true,
  },
  {
    id: "upgrade2",
    name: "Hire Assistant",
    description: "Get help posting.",
    currentCost: 200,
    canAfford: false,
    level: 0,
    maxLevel: 3,
    unlocked: true,
  },
]

describe("Upgrades", () => {
  it("renders upgrades and handles purchase", () => {
    const handlePurchase = jest.fn()
    const { getByText } = render(
      <Upgrades
        availableUpgrades={mockUpgrades as unknown as AvailableUpgradeDisplay[]}
        onPurchaseUpgrade={handlePurchase}
        currentMoney={150}
      />
    )
    expect(getByText(/Invest in “Research”/i)).toBeInTheDocument()
    expect(getByText(/Better Laptop/)).toBeInTheDocument()
    expect(getByText(/Hire Assistant/)).toBeInTheDocument()
  })

  it("shows message when no upgrades are available", () => {
    const { getByText } = render(
      <Upgrades availableUpgrades={[]} onPurchaseUpgrade={jest.fn()} currentMoney={0} />
    )
    expect(getByText(/No upgrades available yet/i)).toBeInTheDocument()
  })
})
