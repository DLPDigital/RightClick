import { Dispatch, SetStateAction } from 'react'
import { initialGameState, SAVE_KEY } from "../data/constants"
import { GameState } from '../types'

interface HandleResetGameProps {
  setGameState: Dispatch<SetStateAction<GameState>>
}

export const handleResetGame = ({ setGameState }: HandleResetGameProps) => {
  if (
    typeof window !== "undefined" &&
    window.confirm("Are you sure you want to reset your game?")
  ) {
    setGameState({ ...initialGameState, lastTick: Date.now() })
    localStorage.removeItem(SAVE_KEY)
  }
}
