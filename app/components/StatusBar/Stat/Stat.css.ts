import { globalStyle, style } from "@vanilla-extract/css"
import { breakpoints } from "../../../theme/theme.css"

export const container = style({
  display: "flex",
  width: "100%",
  gap: "0.25rem",

  "@media": {
    [breakpoints.smallDesktop]: {
      width: "180px",
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
  width: "18px",
  height: "18px",

  "@media": {
    [breakpoints.smallDesktop]: {
      width: "24px",
      height: "24px",
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
  fontSize: "0.75rem",

  "@media": {
    [breakpoints.smallDesktop]: {
      fontSize: "1rem",
    },
  },
})

export const rateNum = style({
  fontSize: "0.5rem",

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

  "@media": {
    [breakpoints.smallDesktop]: {
      flexDirection: "row",
      alignItems: "end",
    },
  },
})

globalStyle(`${numbers} h5`, {
  margin: "0px",
  fontSize: "0.5rem",
  paddingTop: "0.25rem",
  "@media": {
    [breakpoints.smallDesktop]: {
      fontSize: "0.75rem",

      paddingTop: "0rem",
    },
  },
})
