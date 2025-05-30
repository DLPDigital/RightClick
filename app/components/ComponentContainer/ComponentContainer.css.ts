import { style } from "@vanilla-extract/css"
import { vars } from "../../theme/theme.css"

export const container = style({
  padding: "1rem",
  border: `1px dashed ${vars.color.link}`,
  minHeight: "18.75rem",
})
