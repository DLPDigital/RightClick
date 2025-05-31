import React from "react"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Settings } from "./Settings"

describe("Settings", () => {
  it("renders all sections and handles export, import, and reset", async () => {
    const mockExport = jest.fn(() => "exported-data")
    const mockImport = jest.fn()
    const mockReset = jest.fn()
    // Mock clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    })
    // Mock window.confirm
    window.confirm = jest.fn(() => true)

    render(<Settings onExport={mockExport} onImport={mockImport} onReset={mockReset} />)

    // Export
    fireEvent.click(screen.getByText(/Export to Clipboard/i))
    expect(mockExport).toHaveBeenCalled()
    await waitFor(() =>
      expect(screen.getByText(/Game data copied to clipboard!/i)).toBeInTheDocument()
    )
    expect(screen.getByDisplayValue("exported-data")).toBeInTheDocument()
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("exported-data")

    // Import
    fireEvent.change(screen.getByPlaceholderText(/Paste your game data here/i), {
      target: { value: "imported-data" },
    })
    fireEvent.click(screen.getByText(/Import My Game/i))
    expect(window.confirm).toHaveBeenCalled()
    expect(mockImport).toHaveBeenCalledWith("imported-data")
    await waitFor(() =>
      expect(screen.getByText(/Game data imported successfully!/i)).toBeInTheDocument()
    )

    // Reset
    fireEvent.click(screen.getByText(/Reset Game/i))
    expect(mockReset).toHaveBeenCalled()
  })
})
