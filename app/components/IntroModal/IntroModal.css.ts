import { style, globalStyle } from "@vanilla-extract/css"
import { alveraFontBold, breakpoints } from "../../theme/theme.css"

export const container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  marginBottom: "1rem",
})

export const header = style({
  textAlign: "center",
  marginRight: "0.5rem",
  "@media": {
    [breakpoints.smallDesktop]: {
      marginRight: "1rem",
    }}
})

globalStyle(`${header} h1`, {
  fontFamily: alveraFontBold,
  fontSize: "2rem",
  lineHeight: "1.75rem",
  margin: "0 auto",

  "@media": {
    [breakpoints.smallDesktop]: {
      fontSize: "4rem",
      lineHeight: "3rem",
    },
  },
})

export const iconContainer = style({
})

globalStyle(`${iconContainer} img`, {
  height: "50px",
  width: "40px",

  "@media": {
    [breakpoints.smallDesktop]: {
      height: "90px",
      width: "72px",
    },
  },
})
