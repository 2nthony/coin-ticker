import { computed, ref, watch } from "vue";
import { createGlobalState } from "@vueuse/core";
import initTrackingCoins from "./fixtures/init-tracking-coins.json";
import { Coin } from "./types";

const storageKey = "tracking-coins";

export const useStore = createGlobalState(() => {
  const storageValue = localStorage.getItem(storageKey);

  const trackingCoins = ref<Coin[]>(
    storageValue ? JSON.parse(storageValue) : initTrackingCoins,
  );
  const pinCoins = computed(() => trackingCoins.value.filter((i) => i.pin));
  const baseCurrency = ref("usd");
  const latestData = ref({});

  const options = ref({
    menubar: {
      showFullSymbol: false,
    },
  });

  watch(
    trackingCoins,
    () => localStorage.setItem(storageKey, JSON.stringify(trackingCoins.value)),
    { deep: true },
  );

  function trackCoin(coin: Coin) {
    trackingCoins.value.push(coin);
  }
  function unTrackCoin(coin: Coin) {
    const idx = trackingCoins.value.findIndex((t) => t.id === coin.id);
    trackingCoins.value.splice(idx, 1);
  }

  return {
    trackingCoins,
    pinCoins,
    baseCurrency,
    latestData,
    options,

    trackCoin,
    unTrackCoin,
  };
});
