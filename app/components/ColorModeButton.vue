<script setup lang="ts">
const colorMode = useColorMode();

const modes = [
  {
    label: "Light",
    value: "light",
    icon: "i-tabler-sun",
  },
  {
    label: "Dark",
    value: "dark",
    icon: "i-tabler-moon",
  },
  {
    label: "System",
    value: "system",
    icon: "i-tabler-device-desktop",
  },
];

function setMode(mode: string) {
  colorMode.preference = mode;
}
</script>

<template>
  <UPopover>
    <UButton
      variant="soft"
      icon="i-tabler-color-swatch"
      aria-label="Change color mode"
    />
    <template #content>
      <ClientOnly>
        <div class="flex flex-col gap-1 p-2.5 min-w-40">
          <UButton
            v-for="mode in modes"
            :key="mode.value"
            variant="soft"
            size="sm"
            color="neutral"
            class="w-full text-left transition-colors"
            :class="{
              'font-medium text-primary': colorMode.preference === mode.value,
            }"
            @click="setMode(mode.value)"
          >
            <UIcon
              :name="mode.icon"
              class="mr-2 size-4.5"
            />
            <span class="flex-1 text-left">{{ mode.label }}</span>
            <UIcon
              v-if="colorMode.preference === mode.value"
              name="i-tabler-check"
              class="size-4.5 text-primary"
            />
          </UButton>
        </div>
      </ClientOnly>
    </template>
  </UPopover>
</template>
