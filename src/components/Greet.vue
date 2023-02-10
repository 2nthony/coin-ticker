<script setup lang="ts">
import { ref, watch } from "vue";
import { invoke } from "@tauri-apps/api/tauri";
import { api } from "../api";
import { useStore } from "../store";
import { currencify } from "../helpers";
import { useAsyncState, useIntervalFn } from "@vueuse/core";

const { latestData, trackingCoins, pinCoins } = useStore();

const name = ref("");

async function greet() {
  tick();
}

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

const { pause, resume } = useIntervalFn(tick, 33333);
watch(isLoading, (v) => {
  if (v) pause();
  else resume();
});

watch(latestData, updateTrayText);
watch(pinCoins, updateTrayText, { deep: true });
watch(() => trackingCoins.value.length, tick);
</script>

<template>
  <div class="card">
    <input id="greet-input" v-model="name" placeholder="Enter a name..." />
    <button type="button" @click="greet()">Greet</button>
  </div>
</template>
