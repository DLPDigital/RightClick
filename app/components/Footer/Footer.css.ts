import { style, globalStyle } from "@vanilla-extract/css"
import { vars } from "../../theme/theme.css"

export const container = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
})

globalStyle(`${container} p, ${container} a`, {
  fontSize: "0.8em",
  marginTop: "1.25rem",
  textAlign: "center",
  color: vars.color.footerColor,
})
