<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex items-center gap-x-4">
      <Input v-model="search" placeholder="Filter" />
      <Checkbox
        :checked="caseSensitive"
        @change="(val) => (caseSensitive = val)"
        class="inline-flex items-center gap-x-1"
      >
        Case sensitive
      </Checkbox>
    </div>

    <div>
      <p class="text-sm mb-1">Check to track coin price</p>

      <RecycleScroller
        class="h-[432px]"
        :items="coinList"
        :item-size="22"
        key-field="id"
      >
        <template #="{ item: coin, index }: { item: Coin, index: number }">
          <Checkbox
            :checked="getIsTracking(coin)"
            @change="(checked) => change(checked, coin)"
            class="w-full inline-flex items-center gap-x-2 px-2 py-0.5 rounded hover:bg-neutral-300 dark:hover:bg-neutral-700"
            :class="[index % 2 && 'bg-neutral-200 dark:bg-neutral-800']"
          >
            <span class="w-full inline-grid grid-cols-4 gap-x-1">
              <span class="uppercase truncate col-span-1">
                {{ coin.symbol }}
              </span>
              <span class="truncate col-span-3">{{ coin.name }}</span>
            </span>
          </Checkbox>
        </template>
      </RecycleScroller>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchDebounced } from "@vueuse/core";
import { computed, ref } from "vue";
import Checkbox from "../atoms/checkbox.vue";
import CoinList from "../fixtures/coin-list.json";
import { useStore } from "../store";
import { Coin } from "../types";
import Input from "../atoms/input.vue";
import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

const { trackCoin, unTrackCoin, trackingCoins } = useStore();

const search = ref("");
const caseSensitive = ref(false);
const casedSearch = computed(() =>
  caseSensitive.value ? search.value : search.value.toLowerCase(),
);
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
  [casedSearch, caseSensitive],
  () => {
    const list = CoinList.filter((coin) => {
      let symbol = coin.symbol.toLowerCase();
      let name = coin.name.toLowerCase();

      if (caseSensitive.value) {
        symbol = coin.symbol.toUpperCase();
        name = coin.name;
      }

      return (
        symbol.includes(casedSearch.value) || name.includes(casedSearch.value)
      );
    });

    filteredCoinList.value = list;
  },
  { debounce: 100 },
);
</script>
