<script setup lang="ts">
import { watch } from "vue";
import { invoke } from "@tauri-apps/api/tauri";
import { api } from "./api";
import { useStore } from "./store";
import { currencify } from "./helpers";
import { useAsyncState, useIntervalFn } from "@vueuse/core";
import NavBar from "./components/nav-bar.vue";

const ticktime = 33333;
const { latestData, trackingCoins, pinCoins } = useStore();

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
  const text = pinCoins.value
    .map((i) => {
      const data = (latestData.value as any)[i.id];
      return `${i.symbol.slice(0, 1).toUpperCase()} ${
        currencify(data?.usd) ?? "-"
      }`;
    })
    .join("  ");

  invoke("update_tray_text", { text });
}

const { pause, resume } = useIntervalFn(tick, ticktime);
watch(isLoading, (v) => {
  if (v) pause();
  else resume();
});

watch(latestData, updateTrayText);
watch(pinCoins, updateTrayText, { deep: true });
watch(() => trackingCoins.value.length, tick);
</script>

<template>
  <NavBar
    class="bg fixed top-0 left-0 right-0 h-8 px-4 flex items-center rounded-lg"
  />
  <RouterView class="pt-8 overflow-y-scroll h-full" />
</template>
