import { computed, ref, watch } from "vue";
import { createGlobalState, timestamp } from "@vueuse/core";
import initTrackingCoins from "./fixtures/init-tracking-coins.json";
import { Coin, LatestData } from "./types";
import { isEqual } from "./helpers";

const storageKey = "tracking-coins";

export const useStore = createGlobalState(() => {
  const storageValue = localStorage.getItem(storageKey);

  const trackingCoins = ref<Coin[]>(
    storageValue ? JSON.parse(storageValue) : initTrackingCoins,
  );
  const pinCoins = computed(() => trackingCoins.value.filter((i) => i.pin));
  const baseCurrency = ref("usd");
  const latestData = ref<LatestData>({});
  const lastUpdatedTime = ref(timestamp());

  const options = ref({
    menubar: {
      showFullSymbol: false,
      showUnicodeSymbol: true,
    },
  });

  watch(
    trackingCoins,
    () => localStorage.setItem(storageKey, JSON.stringify(trackingCoins.value)),
    { deep: true },
  );
  watch(latestData, (newVal, oldVal) => {
    if (!isEqual(newVal, oldVal)) {
      lastUpdatedTime.value = timestamp();
    }
  });

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
    lastUpdatedTime,
    options,

    trackCoin,
    unTrackCoin,
  };
});
