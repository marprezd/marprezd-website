// src/components/molecules/CurriculumVitae.tsx
"use client"

import { Box, IconButton } from "@chakra-ui/react"
import { IconFileCv } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import React from "react"
import { Tooltip } from "../atoms/ui/tooltip"

export default function CurriculumVitae() {
  const t = useTranslations("app")
  const cv = t("menu.items.resume.tooltip.label")

  return (
    <Box
      css={{
        mx: "-0.2rem",
      }}
    >
      <Tooltip
        content={cv}
        showArrow
      >
        <IconButton
          size="xs"
          aria-label={cv}
          variant="ghost"
          rounded="full"
          colorPalette="primary"
          onClick={() => window.open("/resume/cv.pdf", "_blank")}
        >
          <IconFileCv />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
