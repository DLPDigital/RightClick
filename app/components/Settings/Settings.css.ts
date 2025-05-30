import { style, globalStyle } from "@vanilla-extract/css"
import { vars } from "../../theme/theme.css"

export const resetContainer = style({})

globalStyle(`${resetContainer} button`, {
  backgroundColor: vars.color.warning,
  borderColor: vars.color.lightRed,
})