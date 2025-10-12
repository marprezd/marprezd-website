/* eslint-disable perfectionist/sort-imports */
// src/components/organisms/DesktopMenu.tsx
"use client"

// UI Components
import { Box, Flex } from "@chakra-ui/react"

// Icons
import {
  IconApps,
  IconArticle,
  IconBooks,
  IconBrandPatreon,
  IconBriefcase,
  IconFolder,
  IconGitBranch,
  IconSignature,
  IconTag,
  IconVideo,
} from "@tabler/icons-react"

// Local Components
import { DesktopLinks } from "../molecules/DesktopLinks"

// Hooks
import { useTranslations } from "next-intl"

/*
 * DesktopMenu Component
 * -------------------
 * The DesktopMenu component is a desktop menu component that is used to display the megamenu links.
 * It is used in the AppHeader component.
 */
export default function DesktopMenu() {
  const t = useTranslations("app")

  // Allowed hrefs for the megamenu links
  type AllowedHref
    = | "/"
      | "/blog"
      | "/tags"
      | "/categories"
      | "/repositories"
      | "/works"
      | "/courses"
      | "/hire-me"
      | "/guestbook"
      | "/resources"

  // Megamenu link type
  const megamenuLinks: {
    label: string
    to?: AllowedHref
    icon?: React.ReactNode
    children?: {
      label: string
      description: string
      to?: AllowedHref
      icon?: React.ReactNode
      urlExternal?: string
      target?: string
    }[]
  }[] = [
    {
      label: t("menu.items.home.label"),
      to: "/",
    },
    {
      label: t("menu.items.pages.label"),
      children: [
        {
          label: t("menu.items.pages.items.works.label"),
          description: t("menu.items.pages.items.works.description"),
          to: "/works",
          icon: <IconApps size={18} />,
        },
        {
          label: t("menu.items.pages.items.resources.label"),
          description: t("menu.items.pages.items.resources.description"),
          to: "/resources",
          icon: <IconBooks size={18} />,
        },
        {
          label: t("menu.items.pages.items.hire.label"),
          description: t("menu.items.pages.items.hire.description"),
          to: "/hire-me",
          icon: <IconBriefcase size={18} />,
        },
        {
          label: t("menu.items.pages.items.repositories.label"),
          description: t("menu.items.pages.items.repositories.description"),
          to: "/repositories",
          icon: <IconGitBranch size={18} />,
        },
        {
          label: t("menu.items.pages.items.tags.label"),
          description: t("menu.items.pages.items.tags.description"),
          to: "/tags",
          icon: <IconTag size={18} />,
        },
        {
          label: t("menu.items.pages.items.categories.label"),
          description: t("menu.items.pages.items.categories.description"),
          to: "/categories",
          icon: <IconFolder size={18} />,
        },
      ],
    },
    {
      label: t("menu.items.tutorials.label"),
      children: [
        {
          label: t("menu.items.tutorials.items.courses.label"),
          description: t("menu.items.tutorials.items.courses.description"),
          to: "/courses",
          icon: <IconVideo size={18} />,
        },
        {
          label: t("menu.items.tutorials.items.blog.label"),
          description: t("menu.items.tutorials.items.blog.description"),
          to: "/blog",
          icon: <IconArticle size={18} />,
        },
      ],
    },
    {
      label: t("menu.items.communities.label"),
      children: [
        {
          label: t("menu.items.communities.items.guestbook.label"),
          description: t("menu.items.communities.items.guestbook.description"),
          to: "/guestbook",
          icon: <IconSignature size={18} />,
        },
        {
          label: t("menu.items.communities.items.patreon.label"),
          description: t("menu.items.communities.items.patreon.description"),
          icon: <IconBrandPatreon size={18} />,
          urlExternal: "https://patreon.com/marprezd?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink",
          target: "_blank",
        },
      ],
    },
  ]

  return (
    <Box as="nav">
      <Flex as="ul" align="center" gap={1} listStyleType="none">
        {megamenuLinks.map(item => (
          <Box as="li" key={item.label}>
            <DesktopLinks
              item={item}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  )
}
