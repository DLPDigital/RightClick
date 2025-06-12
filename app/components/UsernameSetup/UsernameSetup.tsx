import React, { useState, useCallback, useEffect, memo } from "react"
import { POST_USERNAMES } from "../../data/generated/usernames"
import Image from "next/image"
import { Button } from "../Button"
import { activeButton } from "../Button/Button.css"
import { IntroModal } from "../IntroModal"
import { AVATARS } from "../../data/avatars"

import {
  usernameSetupContainer,
  statusMessage,
  formContainer,
  inputField,
  buttonRow,
  errorMessage,
  avatarsContainer,
  avatarVariant,
} from "./UsernameSetup.css"
import { AvatarType } from "../../types"

interface UsernameSetupProps {
  onUsernameSet: (username: string) => void
  onAvatarSet: (avatar: AvatarType) => void
}

export const UsernameSetup: React.FC<UsernameSetupProps> = memo(
  ({ onUsernameSet, onAvatarSet }) => {
    // console.log("UsernameSetup RENDERED/RE-RENDERED")
    const [currentUsername, setCurrentUsername] = useState("")
    const [error, setError] = useState("")
    const [selectedAvatar, setSelectedAvatar] = useState<AvatarType | null>(AVATARS[0])

    const getRandomUsername = useCallback(() => {
      if (POST_USERNAMES && POST_USERNAMES.length > 0) {
        const randomIndex = Math.floor(Math.random() * POST_USERNAMES.length)
        setCurrentUsername(POST_USERNAMES[randomIndex])
        setError("")
      } else {
        setCurrentUsername(`TruthSeeker${Math.floor(Math.random() * 900) + 100}`)
      }
    }, [])

    const handleAvatarClick = (avatar: AvatarType) => {
      setSelectedAvatar(avatar)
      onAvatarSet(avatar) // Call the dispatcher passed from parent
      if (error) setError("") // Clear error if one was set for missing avatar
    }

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
      if (trimmedUsername.length > 30) {
        setError("Username cannot be more than 30 characters long.")
        return
      }
      if (!/^[a-zA-Z0-9_-]+$/.test(trimmedUsername)) {
        setError("Username can only contain letters, numbers, underscores, and hyphens.")
        return
      }
      if (!selectedAvatar) {
        setError("Please select an avatar.")
        return
      }
      setError("")
      onUsernameSet(trimmedUsername)
      // onAvatarSet is already called in handleAvatarClick,
      // but if you prefer to set it only on final submit, you can move it here
      // and ensure selectedAvatar is passed to the parent's final state update logic.
    }

    return (
      <>
        <div className={usernameSetupContainer}>
          <IntroModal />
          <p className={statusMessage}>Choose your Avatar</p>
          <div className={avatarsContainer}>
            {AVATARS.map((avatar) => {
              const isSelected = selectedAvatar?.filename === avatar.filename
              const { filename, alt } = avatar
              return (
                <div
                  key={filename}
                  className={isSelected ? avatarVariant.Selected : avatarVariant.Default}
                  onClick={() => handleAvatarClick(avatar)}
                >
                  <Image
                    src={`/images/avatars/${filename}`}
                    alt={alt}
                    title={filename}
                    width="72"
                    height="72"
                  />
                </div>
              )
            })}
          </div>

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
  }
)

UsernameSetup.displayName = "UsernameSetup" // Good for DevTools
