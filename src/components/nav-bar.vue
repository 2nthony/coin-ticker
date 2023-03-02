<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const { routes } = router.options

const icons: Record<string, string> = {
  '/': 'i-fa6-solid-list-check',
  '/select-coins': 'i-fa6-solid-list',
  '/options': 'i-fa6-solid-gear',
  '/about': 'i-fa6-solid-circle-exclamation',
}
</script>

<template>
  <!-- placeholder -->
  <div class="bg navbar-placeholder navbar-height" />

  <header
    v-bind="$attrs"
    class="navbar-height flex justify-between items-center"
  >
    <div class="flex flex-col">
      <h1 class="text-xl font-bold leading-none">
        Coin Ticker
      </h1>
      <span class="text-sm text-neutral-500 leading-3">v0.0.0</span>
    </div>

    <ul class="flex gap-4">
      <li v-for="{ path, meta } in routes" :key="path">
        <RouterLink :to="path">
          <div
            :title="meta!.label as string"
            :class="icons[path]"
            class="text-xl"
          />
        </RouterLink>
      </li>
    </ul>
  </header>
</template>

<style scoped lang="postcss">
.navbar-height {
  @apply h-12 mt-2;
}
</style>
