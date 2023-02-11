<template>
  <div v-bind="$attrs" class="flex justify-between items-center h-12">
    <ul class="flex gap-2">
      <li v-for="{ path, meta } in routes" :key="path">
        <RouterLink :to="path">
          <div
            :title="meta!.label as string"
            :class="icons[path]"
            class="text-lg"
          />
        </RouterLink>
      </li>
    </ul>
  </div>

  <!-- placeholder -->
  <div class="h-12" />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const { routes } = router.options;

const icons: Record<string, string> = {
  "/": "i-fa6-solid-list-check",
  "/select-coins": "i-fa6-solid-list",
  "/options": "i-fa6-solid-gear",
  "/about": "i-fa6-solid-circle-exclamation",
};
</script>
