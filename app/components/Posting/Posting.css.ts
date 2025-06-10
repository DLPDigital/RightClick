import { globalStyle, style } from "@vanilla-extract/css"

export const container = style({})

globalStyle(`${container} button`, {
  padding: "1.25rem",
  fontSize: "1.5rem",
  textTransform: "uppercase",
  margin: "0.5rem 0",
})

export const tip = style({
  marginTop: "1.25rem",
  fontStyle: "italic",
})

export const content = style({
  textAlign: "center",
})
