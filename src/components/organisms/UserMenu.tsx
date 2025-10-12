/* eslint-disable perfectionist/sort-imports */
// src/components/organisms/UserMenu.tsx
"use client"

// External Imports
import React, { useEffect, useId, useState } from "react"
import { useTheme } from "next-themes"
import { usePathname as itemPathname, useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import type { Locale } from "next-intl"

// UI Components
import {
  Box,
  HStack,
  IconButton,
  Menu,
  Portal,
  Separator,
  Text,
} from "@chakra-ui/react"
import {
  IconAdjustments,
  IconCheck,
  IconDeviceDesktop,
  IconMoonStars,
  IconSun,
} from "@tabler/icons-react"
import { posts } from "@velite/content"

// Local Components & Hooks
import { usePathname, useRouter } from "@/i18n/navigation"
import { Tooltip } from "../atoms/ui/tooltip"
import { IconFlagEs, IconFlagGb, IconFlagTr } from "@/components/atoms/Icons"

// Constants
/**
 * Mapping of supported languages with their display names and icons
 */
const LANGUAGE_MAP = {
  en: { name: "English", icon: IconFlagGb },
  es: { name: "Español", icon: IconFlagEs },
  tr: { name: "Türkçe", icon: IconFlagTr },
} as const

/**
 * UserMenu Component
 *
 * A dropdown menu providing access to user preferences including:
 * - Language selection
 * - Theme selection (light/dark/system)
 *
 * Integrates with next-intl for internationalization and next-themes for theme management.
 */
export default function UserMenu() {
  // State
  const [mounted, setMounted] = useState(false)

  // Hooks
  const triggerId = useId()
  const locale = useParams().locale as Locale
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  const singleItemPathname = itemPathname()
  const t = useTranslations("app")
  const { setTheme, theme } = useTheme()

  // Effects
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render on server-side to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  /**
   * Handles language change and updates the URL with the new locale
   * @param lang - The target language code
   */
  const handleTranslationPath = (lang: Locale) => {
    if (lang === locale)
      return

    const nextLocale = lang
    const slug = singleItemPathname.substring(singleItemPathname.lastIndexOf("/") + 1)

    // Handle blog post language switching
    if (pathname?.includes("/blog/[slug]")) {
      const post = posts.find(post => post.slugAsParams === slug)
      const postLang = post?.otherLanguages?.find(obj => obj.code === nextLocale)
      const nextSlug = postLang?.slug

      if (nextSlug) {
        router.replace(
          { pathname: "/blog/[slug]", params: { slug: nextSlug } },
          { locale: nextLocale },
        )
        return
      }
    }

    // Handle category pages
    if (pathname.includes("/categories/")) {
      router.replace(
        { pathname: "/categories/[category]", params: { category: slug } },
        { locale: nextLocale },
      )
      return
    }

    // Handle tag pages
    if (pathname.includes("/tags")) {
      router.replace(
        { pathname: "/tags/[tag]", params: { tag: slug } },
        { locale: nextLocale },
      )
      return
    }

    // Default route handling
    // @ts-expect-error -- TypeScript will validate that only known `params`
    router.replace({ pathname, params }, { locale: nextLocale })
  }

  return (
    <Box>
      <Menu.Root ids={{ trigger: triggerId }}>
        <Tooltip
          ids={{ trigger: triggerId }}
          content={t("user-menu.label")}
          showArrow
        >
          <Menu.Trigger asChild>
            <IconButton
              size="xs"
              aria-label="User menu"
              variant="ghost"
              rounded="full"
              colorPalette="primary"
            >
              <IconAdjustments />
            </IconButton>
          </Menu.Trigger>
        </Tooltip>

        <Portal>
          <Menu.Positioner>
            <Menu.Content w="16rem">
              {/* Language Selection Section */}
              <Menu.ItemGroup>
                <Menu.ItemGroupLabel textTransform="uppercase" fontWeight="normal">
                  {t("user-menu.language.label")}
                </Menu.ItemGroupLabel>
                {Object.entries(LANGUAGE_MAP).map(([code, { name, icon: Icon }]) => (
                  <Menu.Item
                    key={code}
                    value={name}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    onClick={() => handleTranslationPath(code as Locale)}
                  >
                    <HStack>
                      <Icon />
                      <Text fontSize="xs">{name}</Text>
                    </HStack>
                    {code === locale && <IconCheck size={16} />}
                  </Menu.Item>
                ))}
              </Menu.ItemGroup>

              <Separator my={2} />

              {/* Theme Selection Section */}
              <Menu.ItemGroup>
                <Menu.ItemGroupLabel textTransform="uppercase" fontWeight="normal">
                  {t("user-menu.theme.label")}
                </Menu.ItemGroupLabel>
                {[
                  { modeKey: "system", icon: IconDeviceDesktop },
                  { modeKey: "light", icon: IconSun },
                  { modeKey: "dark", icon: IconMoonStars },
                ].map(({ modeKey, icon: Icon }) => (
                  <Menu.Item
                    key={modeKey}
                    value={modeKey}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    onClick={() => setTheme(modeKey as "system" | "light" | "dark")}
                  >
                    <HStack>
                      <Icon size={16} />
                      <Text fontSize="xs">
                        {t(`user-menu.theme.${modeKey}`)}
                      </Text>
                    </HStack>
                    {theme === modeKey && <IconCheck size={16} />}
                  </Menu.Item>
                ))}
              </Menu.ItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Box>
  )
}
