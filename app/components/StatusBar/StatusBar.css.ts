import { style, globalStyle } from "@vanilla-extract/css"
import { vars, breakpoints } from "../../theme/theme.css"

export const container = style({
  backgroundColor: vars.color.background,
  padding: "0.625rem",
  marginBottom: "1.25rem",
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "column",
  "@media": {
    [breakpoints.smallDesktop]: {
      flexDirection: "row",
      gap: "1rem",
    },
  },
})

export const stats = style({
  display: "flex",
  flexDirection: "column",
  padding: "0.25rem 0.25rem 0.5rem",
  "@media": {
    [breakpoints.smallDesktop]: {
      width: "50%",
    },
  },
})

export const statsContainer = style({
  display: "flex",
  flexDirection: "row",
})

export const stat = style({
  width: "100%",
  textAlign: "center",
  padding: "0.25rem",
})

globalStyle(`${container} h5, ${container} h4`, {
  margin: "0.25rem 0 0.25rem",
})

globalStyle(`${container} h4`, {
  textAlign: "center",
})

globalStyle(`${stat} span`, {
  margin: "0 0.625rem",
})

export const insanityLevel = style({
  padding: "0.25rem",
  "@media": {
    [breakpoints.smallDesktop]: {
      width: "50%",
    },
  },
})
