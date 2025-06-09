import React, { useState, useCallback, useEffect, memo } from "react"
import { POST_USERNAMES } from "../../data/generated/usernames"

import {
  usernameSetupContainer,
  statusMessage,
  formContainer,
  inputField,
  buttonRow,
  errorMessage,
} from "./UsernameSetup.css"
import { Button } from "../Button"
import { activeButton } from "../Button/Button.css"
import { IntroModal } from "../IntroModal"

interface UsernameSetupProps {
  onUsernameSet: (username: string) => void
}

export const UsernameSetup: React.FC<UsernameSetupProps> = memo(({ onUsernameSet }) => {
  console.log("UsernameSetup RENDERED/RE-RENDERED")
  const [currentUsername, setCurrentUsername] = useState("")
  const [error, setError] = useState("")

  const getRandomUsername = useCallback(() => {
    if (POST_USERNAMES && POST_USERNAMES.length > 0) {
      const randomIndex = Math.floor(Math.random() * POST_USERNAMES.length)
      setCurrentUsername(POST_USERNAMES[randomIndex])
      setError("")
    } else {
      setCurrentUsername(`TruthSeeker${Math.floor(Math.random() * 900) + 100}`)
    }
  }, [])

  useEffect(() => {
    getRandomUsername()
  }, [getRandomUsername])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedUsername = currentUsername.trim()
    if (trimmedUsername.length < 3) {
      setError("Username must be at least 3 characters long.")
      return
    }
    if (trimmedUsername.length > 20) {
      setError("Username cannot be more than 20 characters long.")
      return
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmedUsername)) {
      setError("Username can only contain letters, numbers, underscores, and hyphens.")
      return
    }
    setError("")
    onUsernameSet(trimmedUsername)
  }

  return (
    <>
    <div className={usernameSetupContainer}>
      <IntroModal />
      <p className={statusMessage}>Choose your username</p>

      <form onSubmit={handleSubmit} className={formContainer}>
        <input
          type="text"
          value={currentUsername}
          onChange={(e) => {
            setCurrentUsername(e.target.value)
            if (error) setError("")
          }}
          placeholder="Enter your username"
          maxLength={25}
          className={inputField}
          autoFocus
        />
        <div className={buttonRow}>
          <Button onClick={getRandomUsername}>Generate a Username</Button>
          <button type="submit" className={activeButton.Active}>
            Start Spreading Truth
          </button>
        </div>
        {error && <p className={errorMessage}>{error}</p>}
      </form>
    </div>
    </>
  )
})

UsernameSetup.displayName = "UsernameSetup" // Good for DevTools
