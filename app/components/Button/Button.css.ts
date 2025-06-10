import { style, styleVariants } from "@vanilla-extract/css"
import { vars } from "../../theme/theme.css"

const button = style({
  border: `1px solid ${vars.color.borderSecondary}`,
  padding: "0.5rem 1rem",
  margin: "0 0.5rem",
  cursor: "pointer",
  fontFamily: vars.fontFamily.Courier,
  ":hover": {
    backgroundColor: vars.color.accent,
  },
  maxWidth: "15rem",
  scrollSnapAlign: "start",
})

export const activeButton = styleVariants({
  Active: [
    button,
    {
      backgroundColor: vars.color.highlight,
      color: vars.color.text,
    },
  ],
  Default: [
    button,
    {
      backgroundColor: vars.color.foreground,
      color: vars.color.secondary,
    },
  ],
})
