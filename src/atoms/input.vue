<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as any).value)"
    class="px-2 py-1 rounded-md"
    :class="[
      'bg-neutral-200',
      'dark:bg-neutral-800',
      'focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2',
    ]"
    spellcheck="false"
  />
</template>

<script setup lang="ts">
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>
