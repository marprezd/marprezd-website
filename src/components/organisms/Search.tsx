/* eslint-disable perfectionist/sort-imports */
// src/components/organisms/Search.tsx
"use client"

// External Imports
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"
import { useRouter } from "@/i18n/navigation"
import { useFormatter, useLocale, useTranslations } from "next-intl"
import Fuse from "fuse.js"
import { posts as data } from "@velite/content"

// UI Components
import {
  Badge,
  Box,
  Card,
  CardTitle,
  CloseButton,
  Dialog,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Kbd,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react"
import { IconCommand, IconSearch } from "@tabler/icons-react"

// Local Components
import CloudImage from "../atoms/CloudImage"
import { Tooltip } from "../atoms/ui/tooltip"

// Fuse.js configuration for fuzzy search
const fuseOptions = {
  keys: ["title", "excerpt", "tags", "categories"],
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 3,
  includeMatches: true,
  shouldSort: true,
}

/**
 * Search Component
 *
 * A global search component that allows users to search through blog posts
 * using fuzzy matching. Supports keyboard shortcuts and provides instant results.
 */
export default function Search() {
  // State Management
  const [isOpen, setIsOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [search, setSearch] = useState("")

  // Refs and Hooks
  const triggerId = useId()
  const ref = useRef<HTMLInputElement | null>(null)
  const t = useTranslations("app")
  const router = useRouter()
  const locale = useLocale()
  const format = useFormatter()

  // Filter posts by current locale
  const posts = useMemo(() => {
    return data.filter(post => post.language === locale)
  }, [data, locale])

  // Initialize Fuse.js with posts and options
  const fuse = useMemo(() => {
    return new Fuse(posts, fuseOptions)
  }, [posts])

  // Search results using Fuse.js
  const results = useMemo(() => {
    if (!search.trim() || search.trim().length < 2) {
      return []
    }
    return fuse.search(search).map(({ item }) => item)
  }, [fuse, search])

  // Handle search input change with debounce
  useEffect(() => {
    if (search.trim().length > 2) {
      setIsSearching(true)
      const timer = setTimeout(() => {
        setIsSearching(false)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [search])

  // Keyboard shortcut handler (Cmd+K / Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((prev) => {
          const newState = !prev
          if (newState) {
            setSearch("")
          }
          return newState
        })
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  /**
   * Handle post selection
   * @param slug - The slug of the selected post
   */
  const handleSelectPost = useCallback((slug: string) => {
    const path = {
      pathname: "/blog/[slug]" as const,
      params: { slug },
    }
    router.push(path)
    setIsOpen(false)
    setSearch("")
  }, [router])

  // Command item component for keyboard shortcuts
  const CommandItem = (props: { label: string, keys: string[] }) => {
    return (
      <HStack>
        {props.label}
        {" "}
        <Kbd size="sm">{props.keys.join(" ")}</Kbd>
      </HStack>
    )
  }

  return (
    <Box>
      <Dialog.Root
        ids={{ trigger: triggerId }}
        open={isOpen}
        onOpenChange={
          e => setIsOpen(e.open)
        }
        lazyMount
        initialFocusEl={() => ref.current}
        motionPreset="slide-in-top"
        scrollBehavior="inside"
        size="md"
      >
        <Tooltip
          ids={{ trigger: triggerId }}
          content={t("search.title")}
          showArrow
        >
          <Dialog.Trigger asChild>
            <IconButton
              size="xs"
              aria-label="Search"
              variant="ghost"
              rounded="full"
              colorPalette="primary"
            >
              <IconCommand />
            </IconButton>
          </Dialog.Trigger>
        </Tooltip>
        <Portal>
          <Dialog.Backdrop backdropFilter="blur(0.10rem)" />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{t("search.title")}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <InputGroup startElement={<IconSearch size="18" />}>
                  <Input
                    ref={ref}
                    value={search}
                    placeholder={t("search.placeholder")}
                    onChange={e => setSearch(e.target.value)}
                  />
                </InputGroup>
                {isSearching
                  ? (
                      <Text
                        textStyle="xs"
                        my="2"
                        color="fg.muted"
                        textAlign="left"
                      >
                        {t("search.starting")}
                      </Text>
                    )
                  : search.trim().length >= 3
                    ? (
                        results.length > 0
                          ? (
                              <Stack
                                gap="4"
                                mt={4}
                                direction="column"
                              >
                                {results.map(post => (
                                  <Card.Root
                                    key={post.slug}
                                    size="sm"
                                    onClick={() => handleSelectPost(post.slug)}
                                  >
                                    <Card.Body gapY="3.5">
                                      <Box
                                        display="flex"
                                        alignItems="center"
                                        flexDirection="row"
                                        gapX="4"
                                      >
                                        {post.cover && (
                                          <Box
                                            flex="none"
                                            w="11"
                                          >
                                            <CloudImage
                                              src={post.cover.image}
                                              alt={post.title}
                                              width={44}
                                              height={44}
                                              quality={80}
                                              crop={{
                                                width: 44,
                                                height: 44,
                                                type: "fill",
                                              }}
                                              style={{
                                                borderRadius: "100%",
                                              }}
                                            />
                                          </Box>
                                        )}
                                        <Box flexGrow={1}>
                                          <CardTitle>
                                            {post.title}
                                          </CardTitle>
                                          {post.lastModified && post.lastModified !== post.date
                                            ? (
                                                <Text
                                                  textStyle="xs"
                                                  color="fg.muted"
                                                >
                                                  <time dateTime={post.lastModified}>
                                                    {format.dateTime(new Date(post.lastModified), {
                                                      year: "numeric",
                                                      month: "long",
                                                      day: "numeric",
                                                      hour: "numeric",
                                                      minute: "numeric",
                                                    })}
                                                  </time>
                                                </Text>
                                              )
                                            : (
                                                <Text
                                                  textStyle="xs"
                                                  color="fg.muted"
                                                >
                                                  <time dateTime={post.date}>
                                                    {format.dateTime(new Date(post.date), {
                                                      year: "numeric",
                                                      month: "long",
                                                      day: "numeric",
                                                      hour: "numeric",
                                                      minute: "numeric",
                                                    })}
                                                  </time>
                                                </Text>
                                              )}
                                        </Box>
                                      </Box>
                                      {post.excerpt && (
                                        <Card.Description>
                                          {post.excerpt}
                                        </Card.Description>
                                      )}
                                    </Card.Body>
                                    <Card.Footer>
                                      {post.tags?.length > 0 && (
                                        <Stack direction="row" gap="2">
                                          {post.tags.slice(0, 3).map(tag => (
                                            <Badge
                                              key={tag}
                                              colorPalette="secondary"
                                              variant="subtle"
                                            >
                                              {tag}
                                            </Badge>
                                          ))}
                                        </Stack>
                                      )}
                                    </Card.Footer>
                                  </Card.Root>
                                ))}
                              </Stack>
                            )
                          : (
                              <Text
                                textStyle="xs"
                                my="2"
                                color="fg.error"
                                textAlign="left"
                              >
                                {t("search.no-found")}
                              </Text>
                            )
                      )
                    : (
                        <Text
                          textStyle="xs"
                          my="2"
                          color="fg.muted"
                          textAlign="left"
                        >
                          {search.trim().length > 0
                            ? t("search.min-chars")
                            : t("search.type-to-search")}
                        </Text>
                      )}
              </Dialog.Body>
              <Dialog.Footer
                textStyle="xs"
                borderTopWidth="1px"
                aria-label="Search actions"
                display="flex"
                justifyContent="start"
                alignItems="center"
                flexWrap="wrap"
              >
                <CommandItem label={t("search.close")} keys={["Esc"]} />
                <CommandItem label={t("search.move-to-top")} keys={["↑"]} />
                <CommandItem label={t("search.move-to-bottom")} keys={["↓"]} />
                <CommandItem label={t("search.select")} keys={["⏎"]} />
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton variant="ghost" color="red" size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  )
}
