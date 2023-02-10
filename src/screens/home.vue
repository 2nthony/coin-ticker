<template>
  <ul class="space-y-0.5">
    <li v-for="coin in trackingCoins" :key="coin.id">
      <Checkbox
        :checked="coin.pin"
        @change="(checked) => (coin.pin = checked)"
        class="w-full inline-flex items-center gap-x-2 px-2 py-0.5 rounded hover:bg-neutral-300 dark:hover:bg-neutral-700 bg-opacity-10"
      >
        <span class="w-full inline-grid grid-cols-12 gap-x-1">
          <span class="uppercase truncate col-span-2">{{ coin.symbol }}</span>

          <span class="truncate col-span-5">{{ coin.name }}</span>

          <ListDataSlot :id="coin.id" v-slot="{ data, positive }">
            <span
              :class="[positive ? 'text-emerald-500' : 'text-rose-500']"
              class="truncate col-span-3"
            >
              ${{ currencify(data?.usd) }}
            </span>

            <span
              :class="[positive ? 'text-emerald-500' : 'text-rose-500']"
              class="col-span-2"
            >
              {{ positive ? "+" : "-"
              }}{{ Math.abs(data?.usd_24h_change).toFixed(2) }}%
            </span>
          </ListDataSlot>
        </span>
      </Checkbox>
    </li>
  </ul>
</template>

<script setup lang="ts">
import Checkbox from "../atoms/checkbox.vue";
import { currencify } from "../helpers";
import { useStore } from "../store";
import ListDataSlot from "../components/list-data-slot.vue";

const { trackingCoins } = useStore();
</script>
