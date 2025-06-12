import { style } from "@vanilla-extract/css"
import { vars } from "../../../theme/theme.css"

export const card = style({
  border: `solid 1px ${vars.color.highlight}`,
  marginBottom: "1rem",
  padding: "0.25rem 1rem 1rem 1rem",
})

export const missing = style({
  fontSize: "0.9em",
  color: vars.color.footerColor,
  marginTop: "0.25rem",
  paddingLeft: "0.5rem",
  display: "flex",
  flexDirection: "column",
})
