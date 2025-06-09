import { style } from "@vanilla-extract/css"
import { vars } from "../../theme/theme.css"

export const container = style({
  height: "100%",
  overflow: "hidden",
})

export const postsContainer = style({
  overflow: "hidden",
  maxHeight: "37.5rem",
  overflowY: "scroll",
  selectors: {
    "&::-webkit-scrollbar": {
      width: "8px",
      background: vars.color.background,
    },
    "&::-webkit-scrollbar-thumb": {
      background: vars.color.foreground,
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: vars.color.accent,
    },
    // For Firefox
    "&": {
      scrollbarColor: `${vars.color.foreground} ${vars.color.background}`,
      scrollbarWidth: "thin",
    },
  },
})
