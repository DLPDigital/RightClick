import { style, globalStyle } from "@vanilla-extract/css"
import { alveraFontBold } from "../../theme/theme.css"

export const container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  marginBottom: "1rem",
})

export const header = style({
  textAlign: "center",
  marginRight: "1rem",
})

globalStyle(`${header} h1`, {
  fontFamily: alveraFontBold,
  fontSize: "4rem",
  lineHeight: "3rem",
  margin: "0 auto",
})

export const iconContainer = style({})
