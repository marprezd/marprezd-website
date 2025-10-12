// src/components/molecules/DesktopLinks.tsx
"use client"

import { Box, Flex, Popover, Portal, Text } from "@chakra-ui/react"
import { IconChevronDown } from "@tabler/icons-react"
import { useSelectedLayoutSegment } from "next/navigation"
import { useState } from "react"
import { Link } from "@/i18n/navigation"

// Base type for menu items with common properties
interface MenuItemBase {
  label: string
  description?: string
  icon?: React.ReactNode
  isActive?: boolean
  hasChildren?: boolean
  isOpen?: boolean
  onToggle?: () => void
}

// Type for child items (no nested children)
type MenuItemChild = Omit<MenuItemBase, "children" | "isOpen" | "onToggle"> & {
  to?: string
  urlExternal?: string
  target?: string
}

// Main menu item type that can have children
type MenuItem = MenuItemBase & {
  to?: string
  children?: MenuItemChild[]
}

interface DesktopLinksProps {
  item: MenuItem
}

// Timer for handling hover delays
let closeTimer: NodeJS.Timeout

export function DesktopLinks({ item }: DesktopLinksProps) {
  // Get current route segment for active state
  const segment = useSelectedLayoutSegment()
  const pathname = segment ? `/${segment}` : "/"
  const [isOpen, setIsOpen] = useState(false)

  // Determine if current item is active
  const isActive = item.isActive ?? (item.to ? pathname === item.to : false)

  // Render the main content of the menu item
  const content = (
    <Flex align="center" gap={2}>
      {item.icon && <Box>{item.icon}</Box>}
      <Text>{item.label}</Text>
      {item.children && (
        <Box
          as={IconChevronDown}
          w="16px"
          h="16px"
          transition="transform 0.2s"
          transform={isOpen ? "rotate(180deg)" : "rotate(0)"}
          aria-hidden="true"
        />
      )}
    </Flex>
  )

  return (
    // Main popover component for dropdown functionality
    <Popover.Root
      open={isOpen}
      onOpenChange={(e) => {
        if (item.children) {
          setIsOpen(e.open)
        }
      }}
    >
      {/* Trigger element - either a button or link */}
      <Popover.Trigger asChild>
        <Box
          as={item.children ? "button" : Link}
          {...(item.children ? {} : { href: item.to })}
          px={4}
          py={2}
          borderRadius="md"
          _hover={{ bg: "blackAlpha.100", color: "primary.600" }}
          _dark={{
            _hover: { bg: "whiteAlpha.100", color: "primary.300" },
            color: isActive ? "primary.300" : "inherit",
          }}
          fontWeight="medium"
          color={isActive ? "primary.600" : "inherit"}
          role={item.children ? "button" : undefined}
          aria-haspopup={!!item.children}
          aria-expanded={item.children ? isOpen : undefined}
        >
          {content}
        </Box>
      </Popover.Trigger>

      {/* Dropdown content */}
      {item.children && (
        <Portal>
          <Popover.Positioner>
            <Popover.Content
              w="36rem"
              // Keep dropdown open when hovering over it
              onPointerEnter={() => clearTimeout(closeTimer)}
              onPointerLeave={() => {
                closeTimer = setTimeout(() => setIsOpen(false), 300)
              }}
            >
              <Popover.Arrow />
              <Popover.Body p={0}>
                <Box p={4}>
                  <Box
                    display="grid"
                    gridTemplateColumns={{ base: "none", md: "repeat(2, 1fr)" }}
                    gap={3}
                  >
                    {item.children.map((child) => {
                      // Check if current child is active
                      const isChildActive = child.to === pathname
                      return (
                        <Box
                          key={child.label}
                          as={child.urlExternal ? "a" : Link}
                          {...(child.urlExternal
                            ? { target: "_blank", href: child.urlExternal }
                            : { href: child.to })}
                          p={3}
                          borderRadius="md"
                          _hover={{
                            bg: "blackAlpha.100",
                            transition: "all 0.2s ease",
                            color: "primary.600",
                          }}
                          _dark={{
                            _hover: {
                              bg: "whiteAlpha.100",
                              color: "primary.300",
                            },
                            color: isChildActive ? "primary.300" : "inherit",
                          }}
                          color={isChildActive ? "primary.600" : "inherit"}
                          transition="all 0.2s ease"
                          onClick={() => {
                            if (item.children) {
                              setIsOpen(false)
                            }
                          }}
                          // Improve touch interaction
                          onTouchStart={() => {
                            if (item.children) {
                              setIsOpen(true)
                            }
                          }}
                          // Keep dropdown open when interacting with items
                          onMouseEnter={() => clearTimeout(closeTimer)}
                          onFocus={() => clearTimeout(closeTimer)}
                        >
                          <Flex align="center" gap={2} mb={1}>
                            {child.icon && <Box>{child.icon}</Box>}
                            <Text fontWeight="medium">{child.label}</Text>
                          </Flex>
                          {child.description && (
                            <Text
                              textStyle="sm"
                              color="gray.600"
                              _dark={{ color: "gray.400" }}
                            >
                              {child.description}
                            </Text>
                          )}
                        </Box>
                      )
                    })}
                  </Box>
                </Box>
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      )}
    </Popover.Root>
  )
}
