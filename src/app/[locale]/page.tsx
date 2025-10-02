import type { Locale } from "next-intl"
import { Box } from "@mui/material"
import { setRequestLocale } from "next-intl/server"
import { use } from "react"

export default function IndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)

  // Enable static rendering
  setRequestLocale(locale as Locale)

  return (
    <Box sx={{ p: 2, mt: 10 }}>
      HomePage
    </Box>
  )
}
