<script setup>
const localePath = useLocalePath()
</script>

<template>
  <div>
    <NuxtLink
      :to="localePath('/')"
      class="flex items-center space-x-3 rtl:space-x-reverse"
    >
      <UAvatar
        provider="cloudinary"
        src="/v1662047991/profile_uezzbj.jpg"
        alt="MP"
        :ui="{
          root: 'border-2 border-accented p-0.5',
        }"
        size="xl"
      />
      <span
        class="hidden md:block self-center font-semibold text-toned text-lg whitespace-nowrap"
      >marprezd</span>
    </NuxtLink>
  </div>
</template>
