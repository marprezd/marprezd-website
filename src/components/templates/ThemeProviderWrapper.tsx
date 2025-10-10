// src/components/templates/ThemeProviderWrapper.tsx
"use client"

import {
  ChakraProvider,
} from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import system from "@/lib/theme"

// The ThemeProviderWrapper component is a wrapper component that provides the theme to the application
// it is used to wrap the entire application.
export function ThemeProviderWrapper(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableColorScheme
        enableSystem
        disableTransitionOnChange
      >
        {props.children}
      </ThemeProvider>
    </ChakraProvider>
  )
}

export default ThemeProviderWrapper
