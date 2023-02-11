<template>
  <span v-bind="$attrs" class="inline-flex items-center">
    <input
      type="checkbox"
      :checked="checked"
      @change="
        $emit('update:checked', (<HTMLInputElement>$event.target).checked)
      "
      class="hover:cursor-pointer"
      :class="[$slots.default && 'mr-1']"
    />

    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  checked?: boolean;
}>();
defineEmits<{
  (e: "update:checked", checked: boolean): void;
}>();
</script>
