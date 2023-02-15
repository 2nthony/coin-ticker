<template>
  <div>
    <p class="text-sm mb-1 text-neutral-500 px-2 flex justify-between">
      <span>Check to pin in menubar</span>
      <span v-if="lastUpdatedTime">
        <span>Updated</span>
        <span class="text-sky-500">{{ " " }}{{ timeago }}</span>
      </span>
    </p>

    <ul>
      <li
        v-for="(coin, idx) in coins"
        :key="coin.id"
        :class="[
          'rounded px-2 -mr-2',
          'hover:bg-opacity-70 hover:bg-neutral-200 dark:hover:bg-neutral-700',
          'even:bg-neutral-100 even:dark:bg-neutral-800',
        ]"
      >
        <Checkbox
          :checked="coin.pin"
          @update:checked="(checked) => togglePin(idx, checked)"
          class="w-full py-0.5"
        >
          <span class="w-full inline-grid grid-cols-12 gap-x-1">
            <span class="uppercase truncate col-span-2">{{ coin.symbol }}</span>

            <span class="truncate col-span-5">{{ coin.name }}</span>

            <span
              :class="[coin.isPositive ? 'text-emerald-500' : 'text-rose-500']"
              class="truncate col-span-3"
            >
              ${{ currencify(coin.data.usd) }}
            </span>

            <span
              :class="[coin.isPositive ? 'text-emerald-500' : 'text-rose-500']"
              class="col-span-2 inline-flex justify-end"
            >
              {{ coin.isPositive ? "+" : "-"
              }}{{ Math.abs(coin.data.usd_24h_change).toFixed(2) }}%
            </span>
          </span>
        </Checkbox>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Checkbox from "../atoms/checkbox.vue";
import { currencify } from "../helpers";
import { useStore } from "../store";
import { useLastChanged, useTimeAgo } from "@vueuse/core";
import { computed } from "vue";

const { trackingCoins, lastUpdatedTime, latestData } = useStore();

const coins = computed(() => {
  return trackingCoins.value.map((coin) => {
    const data = latestData.value[coin.id] ?? {};
    const isPositive = data?.usd_24h_change > 0;

    return {
      ...coin,
      data,
      isPositive,
    };
  });
});

function togglePin(idx: number, checked: boolean) {
  trackingCoins.value[idx].pin = checked;
}

const ms = useLastChanged(lastUpdatedTime, {
  initialValue: lastUpdatedTime.value,
});
const timeago = useTimeAgo(ms);
</script>
