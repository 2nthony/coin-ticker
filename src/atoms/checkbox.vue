<template>
  <span v-bind="$attrs">
    <input
      type="checkbox"
      :checked="checked"
      @change="$emit('checked', (<HTMLInputElement>$event.target).checked)"
      :class="[$slots.defaults && 'mr-1']"
    />

    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  checked?: boolean;
}>();
defineEmits<{
  (e: "change", checked: boolean): void;
}>();
</script>
