<script setup lang="ts">
// import { useRoute } from "vue-router";

const { locale, setLocale, locales } = useI18n()
const loading = ref(false)

// const route = useRoute();
// watchEffect(() => console.log(`Route from useRoute(): ${route.path}`));

// Change locale
async function changeLocale(newLocale: string) {
  if (newLocale === locale.value)
    return
  loading.value = true
  await setLocale(newLocale as 'en' | 'es' | 'tr')
  loading.value = false
}
</script>

<template>
  <div>
    <UPopover arrow>
      <UButton
        variant="soft"
        icon="i-tabler-language"
        aria-label="Change language"
      />
      <template #content>
        <ul class="space-y-1 p-2.5 min-w-40">
          <li
            v-for="l in locales"
            :key="l.code"
          >
            <UButton
              variant="soft"
              color="neutral"
              class="w-full text-left"
              :class="{ 'font-medium text-primary': locale === l.code }"
              :aria-current="locale === l.code ? 'true' : undefined"
              @click="changeLocale(l.code)"
            >
              <UIcon
                :name="l.icon as string"
                class="mr-2 size-5"
              />
              <span class="flex-1 text-left">{{ l.label }}</span>
              <UIcon
                v-if="locale === l.code"
                name="i-tabler-check"
                class="size-5 text-primary"
              />
            </UButton>
          </li>
        </ul>
      </template>
    </UPopover>
  </div>
</template>

<style scoped></style>
