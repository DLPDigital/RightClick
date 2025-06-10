import { style } from "@vanilla-extract/css"
import { vars, breakpoints } from "../../theme/theme.css"

export const container = style({
  width: "100%",
  maxWidth: "800px",
  backgroundColor: vars.color.tertiary,
  border: `solid 1px ${vars.color.footerColor}`,
  padding: "0.75rem 0.25rem",
  margin: "0.75rem 0.5rem",
  boxShadow: `0 0 0.625rem ${vars.color.secondary}`,

  "@media": {
    [breakpoints.smallDesktop]: {
      padding: "1.25rem",
      margin: "1.25rem 1rem",
    },
  },
})
