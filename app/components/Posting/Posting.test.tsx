import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Posting } from "./Posting"

describe("Posting", () => {
  it("renders follower stats and calls onPost when button is clicked", () => {
    const mockOnPost = jest.fn()
    const { getByText } = render(<Posting onPost={mockOnPost} postsFeed={[]} username="testing" />)

    const button = getByText(/Post Conspiracy/i)
    fireEvent.click(button)
    expect(mockOnPost).toHaveBeenCalledTimes(1)
  })
})
