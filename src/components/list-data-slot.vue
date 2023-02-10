<template>
  <slot :data="data" :positive="positive" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "../store";

const { latestData } = useStore();
const { id } = defineProps<{ id: string }>();

const data = computed(() => (latestData.value as any)[id]);
const positive = computed(() => data.value?.usd_24h_change > 0);
</script>
