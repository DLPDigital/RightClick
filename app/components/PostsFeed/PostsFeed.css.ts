import { style, globalStyle } from "@vanilla-extract/css"
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
    '&::-webkit-scrollbar': {
      width: "8px",
      background: vars.color.background,
    },
    '&::-webkit-scrollbar-thumb': {
      background: vars.color.foreground,
      borderRadius: "4px",
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: vars.color.accent,
    },
    // For Firefox
    '&': {
      scrollbarColor: `${vars.color.foreground} ${vars.color.background}`,
      scrollbarWidth: "thin",
    },
  },
})

export const postContent = style({
  margin: "8px 0",
  paddingBottom: "16px",
  selectors: {
    "&::after": {
      content: '""',
      display: "block",
      margin: "24px auto 0 auto",
      width: "50%",
      borderBottom: `1px dashed ${vars.color.text}`,
    },
  },
})

globalStyle(`${postContent} p`, {
  marginTop: "0",
  marginBottom: "8px"
})

globalStyle(`${postContent} span`, {
  fontSize: "0.75em",
  paddingBottom: "0.5rem",
})
