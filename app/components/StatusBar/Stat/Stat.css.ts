import { globalStyle, style } from "@vanilla-extract/css"
import { breakpoints } from "../../../theme/theme.css"

export const container = style({
  display: "flex",
  width: "100%",
  gap: "0.25rem",

  "@media": {
    [breakpoints.smallDesktop]: {
      width: "192px",
      gap: "1rem",
    },
  },
})

export const iconContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 0.25rem",
})

globalStyle(`${iconContainer} svg `, {
  width: "24px",
  height: "24px",

  "@media": {
    [breakpoints.smallDesktop]: {
      width: "36px",
      height: "36px",
    },
  },
})

export const contentContainer = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "0.25rem 0",
  "@media": {
    [breakpoints.smallDesktop]: {
      padding: "0.5rem 0",
    },
  },
})

globalStyle(`${contentContainer} p `, {
  margin: "0",
})

export const totalNum = style({
  fontSize: "1rem",

  "@media": {
    [breakpoints.smallDesktop]: {
      fontSize: "1.25rem",
    },
  },
})

export const rateNum = style({
  fontSize: "0.625rem",

  "@media": {
    [breakpoints.smallDesktop]: {
      fontSize: "0.75rem",
      paddingLeft: "0.25rem",
    },
  },
})

export const numbers = style({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  flexDirection: "column",
  flexWrap: "wrap",

  "@media": {
    [breakpoints.smallDesktop]: {
      flexDirection: "row",
      alignItems: "end",
    },
  },
})

globalStyle(`${numbers} h5`, {
  margin: "0px",
  fontSize: "0.75rem",
  paddingTop: "0.25rem",
  "@media": {
    [breakpoints.smallDesktop]: {
      fontSize: "1rem",

      paddingTop: "0rem",
    },
  },
})
