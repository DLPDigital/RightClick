import { style } from "@vanilla-extract/css"
import { vars, breakpoints } from "../../theme/theme.css"

export const container = style({
  backgroundColor: vars.color.background,
  padding: "0.625rem",
  marginBottom: "0.75rem",
  display: "flex",
  flexDirection: "column",

  "@media": {
    [breakpoints.smallDesktop]: {
      flexDirection: "row",
      gap: "1rem",
      marginBottom: "1.25rem",
    },
  },
})

export const iconsContainer = style({
  display: "flex",
  gap: "1rem",
  justifyContent: "space-between",
  width: "100%",

  "@media": {
    [breakpoints.smallDesktop]: {
      justifyContent: "space-around",
    },
  },
})
