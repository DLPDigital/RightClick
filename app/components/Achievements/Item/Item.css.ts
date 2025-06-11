import { style, globalStyle } from "@vanilla-extract/css"
import { vars, breakpoints } from "../../../theme/theme.css"

export const achievementItem = style({
  border: `solid 1px ${vars.color.highlight}`,
  textAlign: "center",
  width: "100%",
  maxWidth: "280px",
  padding: "1rem",

  "@media": {
    [breakpoints.smallDesktop]: {
      width: "240px",
    },
  },
})

export const iconContainer = style({})

globalStyle(`${iconContainer} svg`, {
  width: "4rem",
  height: "4rem",
})

globalStyle(`${achievementItem} h4`, {
  margin: "0.5rem 0 0 0",
})

globalStyle(`${achievementItem} p`, {
  marginBottom: "0",
})
