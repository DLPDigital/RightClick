import { style } from "@vanilla-extract/css"
import { vars } from "../../theme/theme.css"

export const container = style({
  width: "100%",
  maxWidth: "800px",
  backgroundColor: vars.color.tertiary,
  border: `solid 1px ${vars.color.footerColor}`,
  padding: "1.25rem",
  margin: "1.25rem 1rem",
  boxShadow: `0 0 0.625rem ${vars.color.secondary}`,
})
