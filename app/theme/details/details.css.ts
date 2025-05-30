import { style, globalStyle, styleVariants } from "@vanilla-extract/css"
import { vars } from "../theme.css"

export const container = style({
  display: "flex",
  flexDirection: "column",
  width: "75rem",
  height: "100%",
  backgroundColor: "white",
  margin: "1.5rem auto",
  padding: "40px",
})

globalStyle(`${container} h1, ${container} h2`, {
  color: vars.color.primary,
  textShadow: "none",
})

export const colorContainer = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "1rem",
  padding: "1rem",
  textAlign: "center",
})

const baseColorStyle = style({
  padding: "1rem",
  color: "red",
  width: "150px",
  height: "150px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.25rem",
})

globalStyle(`${colorContainer} span`, {
  color: vars.color.background,
})

globalStyle(`${colorContainer} span.invert`, {
  color: vars.color.text,
})

export const colorBox = styleVariants({
  primary: [
    baseColorStyle,
    {
      backgroundColor: vars.color.primary,
    },
  ],
  secondary: [
    baseColorStyle,
    {
      backgroundColor: vars.color.secondary,
    },
  ],
  tertiary: [
    baseColorStyle,
    {
      backgroundColor: vars.color.tertiary,
    },
  ],
  background: [
    baseColorStyle,
    {
      backgroundColor: vars.color.background,
      color: vars.color.foreground,
    },
  ],
  foreground: [
    baseColorStyle,
    {
      backgroundColor: vars.color.foreground,
    },
  ],
  accent: [
    baseColorStyle,
    {
      backgroundColor: vars.color.accent,
    },
  ],
  highlight: [
    baseColorStyle,
    {
      backgroundColor: vars.color.highlight,
    },
  ],
  text: [
    baseColorStyle,
    {
      backgroundColor: vars.color.text,
    },
  ],
  mutedText: [
    baseColorStyle,
    {
      backgroundColor: vars.color.mutedText,
    },
  ],
  link: [
    baseColorStyle,
    {
      backgroundColor: vars.color.link,
    },
  ],
  border: [
    baseColorStyle,
    {
      backgroundColor: vars.color.border,
    },
  ],
  borderSecondary: [
    baseColorStyle,
    {
      backgroundColor: vars.color.borderSecondary,
    },
  ],
  footerColor: [
    baseColorStyle,
    {
      backgroundColor: vars.color.footerColor,
    },
  ],
  warning: [
    baseColorStyle,
    {
      backgroundColor: vars.color.warning,
      color: vars.color.text,
    },
  ],
  lightRed: [
    baseColorStyle,
    {
      backgroundColor: vars.color.lightRed,
      color: vars.color.text,
    },
  ],
})
