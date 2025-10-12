// src/components/molecules/MobilLinks.tsx
"use client"

import type { ComponentProps, ReactNode } from "react"
import { useTheme } from "next-themes"
import { useSelectedLayoutSegment } from "next/navigation"
import { Link } from "@/i18n/navigation"

/**
 * Props for the MobilLinks component
 * Extends Link component props with additional customization options
 */
type MobilLinksProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: ComponentProps<typeof Link>["href"]
  icon?: ReactNode
  label?: string
  children?: ReactNode
}

/**
 * A mobile-friendly navigation link component with i18n support
 * Handles active state based on current route and provides consistent styling
 */
export default function MobilLinks({
  href,
  icon,
  label,
  children,
  ...rest
}: MobilLinksProps) {
  // Get current layout segment for active route detection
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/"
  const isActive = pathname === href
  const { resolvedTheme } = useTheme()

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      onTouchStart={(e) => {
        resolvedTheme === "dark" ? e.currentTarget.style.backgroundColor = "#051b24" : e.currentTarget.style.backgroundColor = "#ecfeff"
      }}
      onTouchEnd={(e) => {
        e.currentTarget.style.backgroundColor = "transparent"
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingBottom: "0.75rem",
        paddingTop: "0.75rem",
        columnGap: 6,
        color: isActive
          ? resolvedTheme === "dark"
            ? "#67e8f9"
            : "#0891b2"
          : "inherit",
        width: "100%",
        fontWeight: "medium",
        transition: "all 0.2s ease-in-out",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      href={href}
      {...rest}
    >
      {children}
    </Link>
  )
}
