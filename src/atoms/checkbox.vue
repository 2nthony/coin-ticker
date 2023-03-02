<script setup lang="ts">
defineProps<{
  checked?: boolean
}>()
defineEmits<{
  (e: 'update:checked', checked: boolean): void
}>()
</script>

<template>
  <span v-bind="$attrs" class="inline-flex items-center">
    <input
      type="checkbox"
      :checked="checked"
      class="hover:cursor-pointer"
      :class="[$slots.default && 'mr-1']"
      @change="$emit('update:checked', ($event.target as HTMLInputElement).checked)"
    >

    <slot />
  </span>
</template>
