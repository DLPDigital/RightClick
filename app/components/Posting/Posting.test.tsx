import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Posting } from "./Posting"

describe("Posting", () => {
  it("renders follower stats and calls onPost when button is clicked", () => {
    const mockOnPost = jest.fn()
    const { getByText } = render(
      <Posting followers={1234} followersPerClick={56} postsMade={7} onPost={mockOnPost} postsFeed={[]} />
    )

    expect(getByText(/Current Followers/i)).toHaveTextContent("1.23K")
    expect(getByText(/Followers per Post/i)).toHaveTextContent("56")
    expect(getByText(/Total Posts Made/i)).toHaveTextContent("7")
    const button = getByText(/Post Conspiracy/i)
    fireEvent.click(button)
    expect(mockOnPost).toHaveBeenCalledTimes(1)
  })
})
