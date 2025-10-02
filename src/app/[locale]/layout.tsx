import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import BaseLayout from "@/components/BaseLayout"
import { routing } from "@/i18n/routing"
import "../../styles/globals.css"

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const locale = (await params).locale

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <BaseLayout locale={locale}>
      {children}
    </BaseLayout>
  )
}
