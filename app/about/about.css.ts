import { style, globalStyle } from "@vanilla-extract/css"
import { vars } from "../theme/theme.css"


export const container = style({
  maxWidth: "800px",
  margin: "0 auto",
})

globalStyle(`${container} a`, {
  color: vars.color.secondary,
})