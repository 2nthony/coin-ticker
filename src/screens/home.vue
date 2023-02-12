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
        v-for="coin in trackingCoins"
        :key="coin.id"
        :class="[
          'rounded px-2',
          'hover:bg-opacity-70 hover:bg-neutral-200 dark:hover:bg-neutral-700',
          'even:bg-neutral-100 even:dark:bg-neutral-800',
        ]"
      >
        <Checkbox v-model:checked="coin.pin" class="w-full py-0.5">
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
  </div>
</template>

<script setup lang="ts">
import Checkbox from "../atoms/checkbox.vue";
import { currencify } from "../helpers";
import { useStore } from "../store";
import ListDataSlot from "../components/list-data-slot.vue";
import { useLastChanged, useTimeAgo } from "@vueuse/core";

const { trackingCoins, lastUpdatedTime } = useStore();
const ms = useLastChanged(lastUpdatedTime, {
  initialValue: lastUpdatedTime.value,
});
const timeago = useTimeAgo(ms);
</script>
