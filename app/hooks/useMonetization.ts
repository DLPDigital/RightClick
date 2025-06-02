import { useCallback, useMemo, Dispatch } from "react"
import { GameAction } from "../reducers/gameReducer"
import { INITIAL_MONETIZATION_OPTIONS } from "../data/monetization"
import { GameState, MonetizationInstance } from "../types"

// Define what an "available" monetization option might look like for the UI
export interface AvailableMonetizationDisplay extends MonetizationInstance {
  name: string
  description: string
  costToActivate: number
  followerRequirement: number
  moneyPerSecond: number
  canActivate: boolean // Combines cost and follower checks
}

export interface MonetizationHook {
  availableMonetization: AvailableMonetizationDisplay[]
  handleActivateMonetization: (id: string) => void
}

export const useMonetization = (
  gameState: GameState,
  dispatch: Dispatch<GameAction>
): MonetizationHook => {
  const handleActivateMonetization = useCallback(
    (id: string): void => {
      const monetizationData = INITIAL_MONETIZATION_OPTIONS[id]
      if (!monetizationData) {
        console.warn(`MONETIZATION_HOOK: Attempted to activate non-existent option ID: ${id}`)
        return
      }

      const existingOption = (
        Array.isArray(gameState.monetizationOptions) ? gameState.monetizationOptions : []
      ).find((m) => m.id === id)
      if (existingOption && existingOption.active) {
        // console.log(`MONETIZATION_HOOK: Option ${id} is already active.`);
        return
      }

      // Preliminary checks (also in reducer)
      if (
        gameState.money < monetizationData.costToActivate ||
        gameState.followers < monetizationData.followerRequirement
      ) {
        // console.log(`MONETIZATION_HOOK: Cannot activate ${id}, requirements not met.`);
        return
      }

      // console.log(`MONETIZATION_HOOK: Dispatching ACTIVATE_MONETIZATION for ID: ${id}`)
      dispatch({ type: "ACTIVATE_MONETIZATION", payload: { id } })
    },
    [gameState.money, gameState.followers, gameState.monetizationOptions, dispatch]
  )

  const availableMonetization = useMemo((): AvailableMonetizationDisplay[] => {
    // console.log("MONETIZATION_HOOK: Recalculating availableMonetization.")
    // Assumes gameState.monetizationOptions contains all "discovered" options.
    // The 'tick' in the reducer adds newly discoverable options.
    const currentMonetizationOptions = Array.isArray(gameState.monetizationOptions)
      ? gameState.monetizationOptions
      : []

    return currentMonetizationOptions
      .map((gsOption) => {
        const definition = INITIAL_MONETIZATION_OPTIONS[gsOption.id]
        if (!definition) {
          console.warn(
            `MONETIZATION_HOOK: No definition for monetization ID in gameState: ${gsOption.id}`
          )
          return null
        }

        const canMeetRequirements =
          gameState.money >= definition.costToActivate &&
          gameState.followers >= definition.followerRequirement

        return {
          id: gsOption.id,
          active: gsOption.active,
          name: definition.name,
          description: definition.description,
          costToActivate: definition.costToActivate,
          followerRequirement: definition.followerRequirement,
          moneyPerSecond: definition.moneyPerSecond,
          canActivate: !gsOption.active && canMeetRequirements,
        }
      })
      .filter(Boolean) as AvailableMonetizationDisplay[]
  }, [gameState.monetizationOptions, gameState.money, gameState.followers])

  return {
    availableMonetization,
    handleActivateMonetization,
  }
}
