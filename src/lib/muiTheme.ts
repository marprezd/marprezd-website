"use client"

import { createTheme, responsiveFontSizes } from "@mui/material/styles"

const muiTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
    nativeColor: true,
  },
  colorSchemes: {
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: "oklch(71.5% 0.143 215.221)",
        },
        secondary: {
          main: "oklch(65.6% 0.241 354.308)",
        },
        background: {
          default: "oklch(95.1% 0.015 269.921)",
          paper: "oklch(25% 0 0)",
        },
        text: {
          primary: "oklch(98% 0 0)",
          secondary: "oklch(80% 0 0)",
        },
        contrastThreshold: 4.5,
      },
    },
    light: {
      palette: {
        mode: "light",
        primary: {
          main: "oklch(71.5% 0.143 215.221)",
        },
        secondary: {
          main: "oklch(65.6% 0.241 354.308)",
        },
        background: {
          default: "oklch(98% 0 0)",
          paper: "oklch(100% 0 0)",
        },
        text: {
          primary: "oklch(20% 0 0)",
          secondary: "oklch(40% 0 0)",
        },
        contrastThreshold: 4.5,
      },
    },
  },
  typography: {
    fontFamily: ["var(--font-geist-sans)", "var(--font-geist-mono)"].join(","),
  },
})

export default responsiveFontSizes(muiTheme)
