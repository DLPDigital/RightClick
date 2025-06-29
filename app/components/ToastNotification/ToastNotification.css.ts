import { style, keyframes } from "@vanilla-extract/css"
import { vars } from "../../theme/theme.css"

const hide = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 100 },
})

const slideIn = keyframes({
  "0%": { transform: "translateX(calc(100% + 16px))" },
  "100%": { transform: "translateX(0)" },
})

const swipeOut = keyframes({
  "0%": { transform: "translateX(var(--radix-toast-swipe-end-x))" },
  "100%": { transform: "translateX(calc(100% + 16px))" },
})

export const container = style({
  borderRadius: "6px",
  background: vars.color.accent,
  border: `solid 1px ${vars.color.text}`,
  boxShadow: "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  padding: "15px",
  alignItems: "center",
  selectors: {
    '&[data-state="open"]': {
      animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${hide} 100ms ease-in`,
    },
    '&[data-swipe="move"]': {
      transform: "translateX(40px)",
    },
    '&[data-swipe="cancel"]': {
      transform: "translateX(0)",
      transition: "transform 200ms ease-out",
    },
    '&[data-swipe="end"]': {
      animation: `${swipeOut} 100ms ease-out`,
    },
  },
})

export const toastViewport = style({
  position: "fixed",
  bottom: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  width: "400px",
  maxWidth: "calc(100vw - 1rem)",
  margin: "0.5rem",
  listStyle: "none",
  zIndex: 2147483647,
  outline: "none",
  animation: `${hide} 3s`,
})

export const toastTitle = style({
  marginBottom: "5px",
  fontWeight: "500",
  color: "var(--slate-12)",
  fontSize: "15px",
})
