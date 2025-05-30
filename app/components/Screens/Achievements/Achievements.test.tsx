import React from "react"
import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import { Achievements } from "./Achievements"
import { Achievement } from "../../../types"

const mockAchievements = {
  achv1: { id: "achv1", name: "First Post", description: "Make your first post", unlocked: true },
  achv2: { id: "achv2", name: "100 Followers", description: "Reach 100 followers", unlocked: false },
}

const mockUnlockedAchievementIds = ["achv1"]

describe("Achievements", () => {
  it("renders unlocked achievements", () => {
    const { getByText, queryByText } = render(
      <Achievements
        allAchievements={mockAchievements as unknown as Record<string, Achievement>}
        unlockedAchievementIds={mockUnlockedAchievementIds}
      />
    )
    expect(getByText("Achievements")).toBeInTheDocument()
    expect(getByText("First Post")).toBeInTheDocument()
    expect(queryByText("100 Followers")).not.toBeInTheDocument()
  })
})