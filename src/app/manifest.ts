import type { MetadataRoute } from "next"
import { getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: "app",
  })

  return {
    name: t("manifest.name"),
    start_url: "/",
    theme_color: "#101E33",
  }
}
