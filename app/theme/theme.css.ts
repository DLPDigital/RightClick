import { createGlobalTheme } from "@vanilla-extract/css"

export const vars = createGlobalTheme(":root", {
  color: {
    primary: "#1a1a1a",
    secondary: "#0f0",
    tertiary: "#222",
    background: "#111",
    foreground: "#333",
    accent: "#444",
    highlight: "#050",
    text: "#fff",
    mutedText: "#030",
    link: "#070",
    border: "#2a2a2a",
    borderSecondary: "#0a0",
  },
  fontFamily: {
    Courier: `"Courier New", Courier, monospace`,
  },
})

export const breakpointValues = {
  xs: "22.99rem", // 367.84px
  sm: "34.99rem", // 559.84px
  md: "47.99rem", // 767.84px
  lg: "63.99rem", // 1023.84px
  xl: "89.99rem", // 1439.84px
} as const
export const breakpoints = breakpointValues
