import { createGlobalTheme, globalFontFace } from "@vanilla-extract/css"

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
    footerColor: "#080",
    warning: "#500",
    lightRed: "#800",
  },
  fontFamily: {
    Courier: `"Courier New", Courier, monospace`,
  },
})

const breakpointValues = {
  xs: "22.99rem", // 367.84px
  sm: "34.99rem", // 559.84px
  md: "47.99rem", // 767.84px
  lg: "63.99rem", // 1023.84px
  xl: "89.99rem", // 1439.84px
} as const

export const breakpoints = {
  mobile: `screen and (max-width: ${breakpointValues?.sm})`,
  tablet: `screen and (min-width: ${breakpointValues?.md}) and (max-width: ${breakpointValues?.lg})`,
  smallDesktop: `screen and (min-width: ${breakpointValues?.md})`,
  desktop: `screen and (min-width: ${breakpointValues?.lg})`,
  desktopLarge: `screen and (min-width: ${breakpointValues?.xl})`,
}

const alveraFont = "alvera"

globalFontFace(alveraFont, {
  src: `url('/fonts/AlveraDemoRegularSquare.woff2') format('woff2'),
        url('/fonts/AlveraDemoRegularSquare.otf') format('opentype')`,
  fontWeight: "normal",
  fontStyle: "normal",
  fontDisplay: "swap",
})

const alveraFontBold = "alveraBold"

globalFontFace(alveraFontBold, {
  src: `url('/fonts/AlveraDemoBoldSquare.woff2') format('woff2'),
        url('/fonts/AlveraDemoBoldSquare.otf') format('opentype')`,
  fontWeight: "normal",
  fontStyle: "normal",
  fontDisplay: "swap",
})

export { alveraFont, alveraFontBold }
