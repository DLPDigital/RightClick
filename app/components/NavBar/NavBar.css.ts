import { style, globalStyle } from "@vanilla-extract/css"
import { vars } from "../../theme/theme.css"

export const navBar = style({
  marginBottom: "20px",
  textAlign: "center",
})

globalStyle(`${navBar} button`, {
  backgroundColor: vars.color.foreground,
  color: vars.color.secondary,
  border: `1px solid ${vars.color.borderSecondary}`,
  padding: "0.5rem 1rem",
  margin: "0 0.5rem",
  cursor: "pointer",
})

globalStyle(`${navBar} button:hover`, {
  backgroundColor: vars.color.accent,
})

globalStyle(`${navBar} button.active`, {
  backgroundColor: vars.color.highlight,
  color: vars.color.text,
})
