import { style, globalStyle } from "@vanilla-extract/css"

export const navBar = style({
  marginBottom: "1.25rem",
  textAlign: "center",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "0.5rem",
  margin: "1.75rem 0 1rem",
})

globalStyle(`${navBar} button`, {
  marginBottom: "1rem",
})