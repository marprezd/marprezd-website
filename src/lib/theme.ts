// lib/theme.ts
import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react"

// Here we define our custom theme
export const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "var(--font-geist-sans), sans-serif" },
        body: { value: "var(--font-geist-sans), sans-serif" },
        code: { value: "var(--font-geist-mono), monospace" },
      },
      colors: {
        primary: {
          50: { value: "#ecfeff" },
          100: { value: "#cffafe" },
          200: { value: "#a5f3fc" },
          300: { value: "#67e8f9" },
          400: { value: "#22d3ee" },
          500: { value: "#06b6d4" },
          600: { value: "#0891b2" },
          700: { value: "#0c5c72" },
          800: { value: "#134152" },
          900: { value: "#072a38" },
          950: { value: "#051b24" },
        },
        secondary: {
          50: { value: "#fdf2f8" },
          100: { value: "#fce7f3" },
          200: { value: "#fbcfe8" },
          300: { value: "#f9a8d4" },
          400: { value: "#f472b6" },
          500: { value: "#ec4899" },
          600: { value: "#db2777" },
          700: { value: "#a41752" },
          800: { value: "#6d0e34" },
          900: { value: "#45061f" },
          950: { value: "#2c0514" },
        },
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          contrast: {
            value: {
              base: "white",
              _dark: "white",
            },
          },
          fg: {
            value: {
              base: "{colors.primary.700}",
              _dark: "{colors.primary.300}",
            },
          },
          subtle: {
            value: {
              base: "{colors.primary.100}",
              _dark: "{colors.primary.900}",
            },
          },
          muted: {
            value: {
              base: "{colors.primary.200}",
              _dark: "{colors.primary.800}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.primary.300}",
              _dark: "{colors.primary.700}",
            },
          },
          solid: {
            value: {
              base: "{colors.primary.600}",
              _dark: "{colors.primary.600}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.primary.500}",
              _dark: "{colors.primary.500}",
            },
          },
        },
        secondary: {
          contrast: {
            value: {
              base: "white",
              _dark: "white",
            },
          },
          fg: {
            value: {
              base: "{colors.secondary.700}",
              _dark: "{colors.secondary.300}",
            },
          },
          subtle: {
            value: {
              base: "{colors.secondary.100}",
              _dark: "{colors.secondary.900}",
            },
          },
          muted: {
            value: {
              base: "{colors.secondary.200}",
              _dark: "{colors.secondary.800}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.secondary.300}",
              _dark: "{colors.secondary.700}",
            },
          },
          solid: {
            value: {
              base: "{colors.secondary.600}",
              _dark: "{colors.secondary.600}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.secondary.500}",
              _dark: "{colors.secondary.500}",
            },
          },
        },
      },
    },
  },
})

// After defining the theme, we create the system
const system = createSystem(defaultConfig, config)

// And export the system. That's it!
export default system
