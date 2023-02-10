<template>
  <Input v-model="search" placeholder="Filter" />

  <ul>
    <li v-for="coin in coinList" :key="coin.id" class="">
      <Checkbox
        :checked="getIsTracking(coin)"
        @change="(checked) => change(checked, coin)"
        class="inline-flex items-center gap-x-2"
      >
        <span class="w-full inline-grid grid-cols-4 gap-x-1">
          <span class="uppercase truncate col-span-1">{{ coin.symbol }}</span>
          <span class="truncate col-span-3">{{ coin.name }}</span>
        </span>
      </Checkbox>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { watchDebounced } from "@vueuse/core";
import { computed, ref } from "vue";
import Checkbox from "../atoms/checkbox.vue";
import CoinList from "../fixtures/coin-list.json";
import { useStore } from "../store";
import { Coin } from "../types";
import Input from "../atoms/input.vue";

const { trackCoin, unTrackCoin, trackingCoins } = useStore();

const search = ref("");
const filteredCoinList = ref<Coin[]>([]);
const coinList = computed(() => {
  if (search.value) {
    return filteredCoinList.value;
  }

  return CoinList;
});

function change(checked: boolean, coin: Coin) {
  if (checked) trackCoin(coin);
  else unTrackCoin(coin);
}

function getIsTracking(coin: Coin) {
  return trackingCoins.value.findIndex((i) => i.id === coin.id) >= 0;
}

watchDebounced(
  search,
  () => {
    const list = CoinList.filter(
      (coin) =>
        coin.symbol.toLowerCase().includes(search.value.toLowerCase()) ||
        coin.name.toLowerCase().includes(search.value.toLowerCase()),
    );
    filteredCoinList.value = list;
  },
  { debounce: 100 },
);
</script>
