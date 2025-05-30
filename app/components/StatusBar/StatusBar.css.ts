import { style, globalStyle } from "@vanilla-extract/css"
import { vars } from "../../theme/theme.css"

export const container = style({
  backgroundColor: vars.color.background,
  padding: "0.625rem",
  marginBottom: "1.25rem",
  display: "flex",
  justifyContent: "space-around",
})

globalStyle(`${container} span`, {
  margin: "0 0.625rem",
})
