/* eslint-disable perfectionist/sort-imports */
// src/components/organisms/MobilMenu.tsx
"use client"

// UI Components
import {
  Box,
  Button,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react"

// Icons
import {
  IconApps,
  IconArticle,
  IconBooks,
  IconBrandPatreon,
  IconBriefcase,
  IconChevronDown,
  IconFolder,
  IconGitBranch,
  IconHome,
  IconSignature,
  IconTag,
  IconVideo,
} from "@tabler/icons-react"

// Local Components
import MobilLinks from "../molecules/MobilLinks"

// Hooks
import { useTranslations } from "next-intl"
import { useState } from "react"

/**
 * Props for the MobileMenu component
 */
interface MobileMenuProps {
  onClose: () => void // Function to close the mobile menu
}

/**
 * Mobile navigation menu component with collapsible sections
 * Handles both single-level and nested menu items with proper keyboard navigation
 */
function MobilMenu({ onClose }: MobileMenuProps) {
  // State for tracking open dropdowns
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const t = useTranslations("app")

  // Toggle dropdown menu expansion
  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  // Define allowed route paths for type safety
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

  // Menu items configuration with i18n support
  const items: {
    label: string
    to?: AllowedHref
    icon?: React.ReactNode
    children?: {
      label: string
      to?: AllowedHref
      icon?: React.ReactNode
      urlExternal?: string
      target?: string
    }[]
  }[] = [
    {
      label: t("menu.items.home.label"),
      to: "/",
      icon: <IconHome />,
    },
    {
      label: t("menu.items.pages.label"),
      children: [
        {
          label: t("menu.items.pages.items.works.label"),
          to: "/works",
          icon: <IconApps />,
        },
        {
          label: t("menu.items.pages.items.resources.label"),
          to: "/resources",
          icon: <IconBooks />,
        },
        {
          label: t("menu.items.pages.items.hire.label"),
          to: "/hire-me",
          icon: <IconBriefcase />,
        },
        {
          label: t("menu.items.pages.items.repositories.label"),
          to: "/repositories",
          icon: <IconGitBranch />,
        },
        {
          label: t("menu.items.pages.items.tags.label"),
          to: "/tags",
          icon: <IconTag />,
        },
        {
          label: t("menu.items.pages.items.categories.label"),
          to: "/categories",
          icon: <IconFolder />,
        },
      ],
    },
    {
      label: t("menu.items.tutorials.label"),
      children: [
        {
          label: t("menu.items.tutorials.items.courses.label"),
          to: "/courses",
          icon: <IconVideo />,
        },
        {
          label: t("menu.items.tutorials.items.blog.label"),
          to: "/blog",
          icon: <IconArticle />,
        },
      ],
    },
    {
      label: t("menu.items.communities.label"),
      children: [
        {
          label: t("menu.items.communities.items.guestbook.label"),
          to: "/guestbook",
          icon: <IconSignature />,
        },
        {
          label: t("menu.items.communities.items.patreon.label"),
          icon: <IconBrandPatreon />,
          urlExternal: "https://patreon.com/marprezd?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink",
          target: "_blank",
        },
      ],
    },
  ]

  /**
   * Renders a single menu item, handling both simple links and dropdowns
   * @param item - Menu item configuration
   * @param parentKey - Unique key for React rendering
   * @returns JSX for the menu item
   */
  const renderMenuItem = (item: typeof items[number], parentKey: string) => {
    const hasChildren = item.children && item.children.length > 0
    const isDropdownOpen = openDropdown === item.label

    return (
      <Box
        as="li"
        key={parentKey}
        w="full"
      >
        <VStack w="full">
          {hasChildren
            ? (
                // Dropdown menu item
                <>
                  <Button
                    variant="ghost"
                    w="full"
                    justifyContent="space-between"
                    alignItems="center"
                    display="flex"
                    py={2}
                    mt={2.5}
                    aria-expanded={isDropdownOpen}
                    onClick={() => toggleDropdown(item.label)}
                  >
                    <HStack>
                      {item.icon}
                      <Text>
                        {item.label}
                      </Text>
                    </HStack>
                    <Icon
                      size="sm"
                      color="muted"
                      transform={
                        isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)"
                      }
                      transition="transform 0.2s ease-in-out"
                    >
                      <IconChevronDown />
                    </Icon>
                  </Button>
                  {isDropdownOpen && (
                    <Box as="ul" py={1} w="full">
                      {item.children?.map((child, index) => (
                        <Box as="li" key={index}>
                          {child.urlExternal
                            ? (
                                // External link
                                <a
                                  href={child.urlExternal}
                                  target={child.target}
                                  rel="noopener noreferrer"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: "1rem",
                                    paddingRight: "1rem",
                                    paddingBottom: "0.75rem",
                                    paddingTop: "0.75rem",
                                    columnGap: 6,
                                    transition: "color 0.2s ease-in-out",
                                  }}
                                >
                                  {child.icon && (
                                    <Icon size="sm">{child.icon}</Icon>
                                  )}
                                  {child.label}
                                </a>
                              )
                            : child.to
                              ? (
                                  // Internal link with i18n support
                                  <MobilLinks
                                    key={child.to}
                                    href={child.to}
                                    onClick={onClose}
                                    icon={child.icon}
                                    {...child}
                                  >
                                    {child.icon && (
                                      <Icon size="sm">{child.icon}</Icon>
                                    )}
                                    {child.label}
                                  </MobilLinks>
                                )
                              : null}
                        </Box>
                      ))}
                    </Box>
                  )}
                </>
              )
            : (
                item.to
                  ? (
                      // Single-level menu item
                      <MobilLinks
                        key={item.to}
                        href={item.to}
                        onClick={onClose}
                        icon={item.icon}
                        {...item}
                      >
                        {item.icon && (
                          <Icon size="sm">{item.icon}</Icon>
                        )}
                        {item.label}
                      </MobilLinks>
                    )
                  : null
              )}
        </VStack>
      </Box>
    )
  }

  return (
    <Box
      as="nav"
      py={2}
      w="full"
    >
      <Box
        as="ul"
        w="full"
        gapY={1}
      >
        {items.map((item, index) => renderMenuItem(item, index.toString()))}
      </Box>
    </Box>
  )
}

export default MobilMenu
