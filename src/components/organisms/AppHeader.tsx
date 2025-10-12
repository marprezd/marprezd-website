/* eslint-disable perfectionist/sort-imports */
// src/components/organisms/AppHeader.tsx
"use client"

// UI Components
import {
  Box,
  CloseButton,
  Container,
  Drawer,
  Flex,
  HStack,
  IconButton,
  Portal,
} from "@chakra-ui/react"

// Icons
import { IconMenuDeep } from "@tabler/icons-react"

// Local Components
import LogoAvatar from "../atoms/LogoAvatar"
import CurriculumVitae from "../molecules/CurriculumVitae"
import DesktopMenu from "./DesktopMenu"
import MobilMenu from "./MobilMenu"
import Search from "./Search"
import UserMenu from "./UserMenu"

// Hooks
import React from "react"

/*
 * AppHeader Component
 * ------------------
 * The AppHeader component is a fixed header component that is used to display the logo, desktop menu, right controls, and mobile menu.
 * It is used in the AppLayout component.
 */
export default function AppHeader() {
  const [mounted, setMounted] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted)
    return null

  return (
    <Box
      position="fixed"
      top={0}
      w="100%"
      h="64px"
      borderBottom="1px"
      borderBottomColor="gray.300"
      _dark={{ borderBottomColor: "gray.700" }}
      bg="bg.subtle"
      display="flex"
      alignItems="center"
      zIndex="sticky"
      boxShadow="sm"
    >
      <Container maxW="8xl">
        <Flex
          align="center"
          justify="space-between"
          wrap="nowrap"
        >
          {/* Logo */}
          <Box flexShrink={0}>
            <LogoAvatar />
          </Box>

          {/* Desktop Menu */}
          <HStack
            paddingX={2}
            flex={1}
            justify="center"
            display={{ base: "none", md: "flex" }}
          >
            <DesktopMenu />
          </HStack>

          {/* Right Controls */}
          <HStack
            bg={{ base: "white", _dark: "black" }}
            border="1px solid"
            borderColor="border.emphasized"
            borderRadius="full"
            p={1}
          >
            <UserMenu />
            <CurriculumVitae />
            <Search />
          </HStack>

          {/* Mobile Menu (Drawer) - hidden on md and above */}
          <Drawer.Root
            open={open}
            onOpenChange={e => setOpen(e.open)}
            size="full"
          >
            <Drawer.Trigger asChild>
              <IconButton
                size="sm"
                aria-label="Mobile menu"
                variant="surface"
                colorPalette="primary"
                rounded="xl"
                display={{ base: "flex", md: "none" }}
              >
                <IconMenuDeep />
              </IconButton>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>
                      Main Menu
                    </Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body>
                    <MobilMenu onClose={() => setOpen(false)} />
                  </Drawer.Body>
                  <Drawer.Footer>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton
                        color="red"
                        variant="ghost"
                      />
                    </Drawer.CloseTrigger>
                  </Drawer.Footer>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
        </Flex>
      </Container>
    </Box>
  )
}
