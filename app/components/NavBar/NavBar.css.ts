import { style, globalStyle } from "@vanilla-extract/css"
import { breakpoints, vars } from "../../theme/theme.css"

export const navBar = style({
  textAlign: "center",
  display: "flex",
  flexWrap: "nowrap",
  overflow: "hidden",
  overflowX: "scroll",
  maxWidth: "calc(100vw - 5rem)",
  marginBottom: "1rem",
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
  "@media": {
    [breakpoints.smallDesktop]: {
      marginBottom: "1.25rem",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "0.5rem",
      margin: "1.75rem 0 1rem",
      overflowX: "unset",
    },
  },
})

globalStyle(`${navBar} button`, {
  marginBottom: "1rem",
})
