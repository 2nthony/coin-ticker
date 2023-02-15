<template>
  <div class="flex flex-col gap-y-2 px-2">
    <div class="">
      <h3>Menubar</h3>
      <p>
        <Checkbox v-model:checked="options.menubar.showFullSymbol">
          Show full symbol
          <span class="hint">(BTC or B)</span>
        </Checkbox>
      </p>
      <p>
        <Checkbox v-model:checked="options.menubar.showUnicodeSymbol">
          Show unicode symbol
          <span class="hint">({{ Symbols[0].unicode }} or B)</span>
        </Checkbox>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Checkbox from "../atoms/checkbox.vue";
import { useStore } from "../store";
import Symbols from "../fixtures/symbols.json";

const { options } = useStore();
</script>

<style scoped lang="postcss">
h3 {
  @apply text-xl font-bold;
}

.hint {
  @apply ml-2 text-neutral-500;
}
</style>
