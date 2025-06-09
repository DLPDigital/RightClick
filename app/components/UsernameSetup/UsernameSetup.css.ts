import { style } from "@vanilla-extract/css"
import { vars, alveraFontBold } from "../../theme/theme.css"

export const usernameSetupContainer = style({
  backgroundColor: vars.color.tertiary,
  color: vars.color.text,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  padding: "1.25rem",
  textAlign: "center",
  boxSizing: "border-box",
})

export const welcomeMessage = style({
  fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
  fontFamily: alveraFontBold,
  marginBottom: "0",
})

export const statusMessage = style({
  fontSize: "clamp(1rem, 4vw, 1.3rem)",
  whiteSpace: "pre-wrap",
  marginBottom: "0",
})

export const formContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  maxWidth: "25rem",
  marginTop: "1.25rem", // Add some space above the form
})

export const inputField = style({
  padding: "0.75rem 1rem",
  fontSize: "1rem",
  fontFamily: alveraFontBold,
  textAlign: "center",
  borderRadius: "0.375rem",
  border: `1px solid ${vars.color.text}`,
  backgroundColor: vars.color.tertiary,
  color: vars.color.text,
  outline: "none",
  transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
})

export const buttonRow = style({
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
  marginTop: "0.375rem",
})

export const errorMessage = style({
  color: vars.color.secondary,
  marginTop: "0.5rem",
  minHeight: "1.2em",
  fontSize: "0.9rem",
})
