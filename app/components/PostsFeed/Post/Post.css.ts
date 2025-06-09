import { globalStyle, style } from "@vanilla-extract/css"
import { vars } from "../../../theme/theme.css"

export const container = style({
  display: "flex",
  marginBottom: "1rem",
})

globalStyle(`${container} + ${container}`, {
  margin: "1rem 0",
})

export const avatarContainer = style({
  padding: "0.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

export const avatar = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: vars.color.foreground,
  height: "2.5rem",
  width: "2.5rem",
  borderRadius: "50%",
})

export const tweetContainer = style({
  display: "flex",
  flexDirection: "column",
})

export const userContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  paddingTop: "0.5rem",
})

globalStyle(`${userContainer} h4`, {
  margin: "0",
})

export const contentContainer = style({
  marginTop: "0.25rem",
  paddingRight: "0.5rem",
  fontSize: "0.875rem",
})

globalStyle(`${contentContainer} span`, {
  fontWeight: 600,
  color: vars.color.borderSecondary,
})

export const iconsContainer = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: "0.5rem",
  paddingRight: "0.5rem",
  maxWidth: "25rem",
})

globalStyle(`${iconsContainer} div`, {
  display: "flex",
  flexDirection: "row",
  gap: "0.25rem",
  padding: "0.25rem 0",
  alignItems: "center",
  width: "100%",
  color: vars.color.borderSecondary,
})

globalStyle(`${iconsContainer} div svg`, {
  width: "1.125rem",
  height: "1.125rem",
})
