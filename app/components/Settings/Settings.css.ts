import { style, globalStyle } from "@vanilla-extract/css"
import { vars } from "../../theme/theme.css"

export const resetContainer = style({})

globalStyle(`${resetContainer} button`, {
  backgroundColor: vars.color.warning,
  borderColor: vars.color.lightRed,
})

export const importContainer = style({
  margin: "2rem 0",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
})
