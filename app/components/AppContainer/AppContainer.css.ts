import { style } from "@vanilla-extract/css"
import { vars } from "../../theme/theme.css"

export const container = style({
  width: "50rem",
  maxWidth: "95%",
  backgroundColor: vars.color.tertiary,
  border: `solid 1px ${vars.color.footerColor}`,
  padding: "1.25rem",
  marginTop: "1.25rem",
  boxShadow: `0 0 0.625rem ${vars.color.secondary}`,
})
