<script setup lang="ts">
import { watch } from "vue";
import { invoke } from "@tauri-apps/api/tauri";
import { api } from "./api";
import { useStore } from "./store";
import { currencify } from "./helpers";
import { useAsyncState, useIntervalFn } from "@vueuse/core";
import NavBar from "./components/nav-bar.vue";

const ticktime = 33333;
const { latestData, trackingCoins, pinCoins, options } = useStore();

const { execute, isLoading } = useAsyncState(
  () =>
    api.price({
      ids: trackingCoins.value.map((i) => i.id),
      vs_currencies: "usd",
      include_24hr_change: true,
    }),
  null,
);

function tick() {
  execute().then((v) => {
    if (v) {
      latestData.value = v;
    }
  });
}

function updateTrayText() {
  const { menubar } = options.value;

  const text = pinCoins.value
    .map((i) => {
      const data = (latestData.value as any)[i.id];
      let symbol = i.symbol;
      if (!menubar.showFullSymbol) {
        symbol = symbol.slice(0, 1);
      }

      return `${symbol.toUpperCase()} ${currencify(data?.usd) ?? "-"}`;
    })
    .join("  ");

  invoke("update_tray_text", { text });
}

const { pause, resume } = useIntervalFn(tick, ticktime);
watch(isLoading, (v) => {
  if (v) pause();
  else resume();
});

watch([pinCoins, latestData, () => options.value.menubar], updateTrayText, {
  deep: true,
});
watch(() => trackingCoins.value.length, tick);
</script>

<template>
  <NavBar
    class="bg fixed top-0 left-0 right-0 px-4 flex items-center rounded-t-lg"
  />
  <div class="p-2 h-full overflow-y-scroll">
    <RouterView />
  </div>
</template>
