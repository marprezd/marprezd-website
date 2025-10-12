import type { Locale } from "next-intl"
import { Box } from "@chakra-ui/react"
import { setRequestLocale } from "next-intl/server"
import { use } from "react"

export default function IndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)

  // Enable static rendering
  setRequestLocale(locale as Locale)

  return (
    <Box p={2} mt={10}>
      HomePage
    </Box>
  )
}
