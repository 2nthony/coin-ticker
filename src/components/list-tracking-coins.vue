<template>
  <ul class="space-y-0.5">
    <li
      v-for="(coin, idx) in trackingCoins"
      :key="coin.id"
      class="flex gap-x-2 items-baseline"
    >
      <input type="checkbox" :checked="coin.pin" @change="change(idx)" />

      <div class="inline-grid grid-cols-7 flex-1 gap-x-2">
        <span class="uppercase truncate">{{ coin.symbol }}</span>

        <span class="truncate col-span-3">{{ coin.name }}</span>

        <ListDataSlot :id="coin.id" v-slot="{ data, positive }">
          <span
            :class="[positive ? 'text-emerald-500' : 'text-rose-500']"
            class="truncate col-span-2"
          >
            ${{ currencify(data?.usd) }}
          </span>

          <span :class="[positive ? 'text-emerald-500' : 'text-rose-500']">
            {{ positive ? "+" : "-"
            }}{{ Math.abs(data?.usd_24h_change).toFixed(2) }}%
          </span>
        </ListDataSlot>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { currencify } from "../helpers";
import { useStore } from "../store";
import ListDataSlot from "./list-data-slot.vue";

const { trackingCoins } = useStore();

function change(idx: number) {
  trackingCoins.value[idx].pin = !trackingCoins.value[idx].pin;
}
</script>
