<template>
  <ul class="flex gap-2">
    <li v-for="{ path, meta } in routes" :key="path">
      <RouterLink :to="path">{{ meta?.label }}</RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const { routes } = router.options;
</script>
