import { style, globalStyle } from "@vanilla-extract/css"
import { breakpoints, vars } from "../../../theme/theme.css"

export const container = style({
  border: `solid 1px ${vars.color.highlight}`,
  display: "flex",
  marginBottom: "1rem",
  flexDirection: "column",
  padding: "0.5rem",

  "@media": {
    [breakpoints.smallDesktop]: {
      flexDirection: "row",
      padding: "0",
    },
  },
})

export const iconContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 1rem",
})

globalStyle(`${iconContainer} svg`, {
  width: "48px",
  height: "48px",
})

export const contentContainer = style({
  display: "flex",
  width: "100%",
  flexDirection: "column",

  "@media": {
    [breakpoints.smallDesktop]: {
      flexDirection: "row",
    },
  },
})

export const content = style({
  padding: "1rem 0.5rem",
  width: "100%",

  "@media": {
    [breakpoints.smallDesktop]: {
      width: "60%",
    },
  },
})

export const buttonContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",

  "@media": {
    [breakpoints.smallDesktop]: {
      width: "40%",
    },
  },
})

globalStyle(`${content} h3, ${content} p, ${content} h4, ${buttonContainer} p`, {
  margin: "0.25rem 0 0 0",
})

export const requirementsContainer = style({
  width: "100%",
  margin: "0.5rem 0 0.5rem 0",
})

globalStyle(`${requirementsContainer} p, ${requirementsContainer} h5`, {
  margin: "0",
})

globalStyle(`${requirementsContainer} h5`, {
  fontSize: "0.875rem",
})

globalStyle(`${requirementsContainer} div`, {
  display: "flex",
  justifyContent: "space-between",
  paddingTop: "0.5rem",
  width: "90%",

  "@media": {
    [breakpoints.smallDesktop]: {
      width: "100%",
    },
  },
})

export const requirementsMissing = style({
  fontSize: "0.9em",
  color: vars.color.footerColor,
  marginTop: "0.25rem",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
})
