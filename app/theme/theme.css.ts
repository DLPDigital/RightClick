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
  },
  fontFamily: {
    Courier: `"Courier New", Courier, monospace`,
  }
})

