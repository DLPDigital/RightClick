import { style } from "@vanilla-extract/css"
import { vars } from "../../theme/theme.css"

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
  fontWeight: "bold",
  marginBottom: "1rem",
  color: "#e0e0e0",
})

export const statusMessage = style({
  fontFamily: "monospace, 'Courier New', Courier",
  fontSize: "clamp(1rem, 4vw, 1.3rem)",
  color: "#00ff00",
  marginBottom: "1.5rem",
  whiteSpace: "pre-wrap",
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
  borderRadius: "0.375rem",
  border: "1px solid #444",
  backgroundColor: "#222",
  color: vars.color.text,
  outline: "none",
  transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  ":focus": {
    borderColor: "#00ff00",
    boxShadow: "0 0 0 0.125rem rgba(0, 255, 0, 0.3)",
  },
  "::placeholder": {
    color: "#888",
  },
})

export const buttonRow = style({
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
  marginTop: "0.375rem",
  flexWrap: "wrap",
})

export const errorMessage = style({
  color: "#ff5555",
  marginTop: "0.5rem",
  minHeight: "1.2em",
  fontSize: "0.9rem",
})
