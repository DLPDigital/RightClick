import { style } from "@vanilla-extract/css"
import { vars } from "../../theme/theme.css"

export const footerStyle = style({
  fontSize: "0.8em",
  marginTop: "1.25rem",
  textAlign: "center",
  color: vars.color.footerColor,
})
