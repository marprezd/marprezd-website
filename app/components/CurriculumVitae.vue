<template>
  <div>
    <UTooltip :text="cv">
      <UButton
        color="neutral"
        variant="soft"
        icon="i-tabler-file-cv"
        :to="`${host}/resume/cv.pdf`"
        target="_blank"
      >
        {{ t("app.menu.items.resume.label") }}
      </UButton>
    </UTooltip>
  </div>
</template>

<script setup lang="ts">
import { host } from "#imports";

const { t } = useI18n();
const cv = t("app.menu.items.resume.tooltip.label");
</script>
