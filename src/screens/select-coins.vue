<script setup lang="ts">
import { computed, ref } from 'vue'
import { RecycleScroller } from 'vue-virtual-scroller'
import Checkbox from '../atoms/checkbox.vue'
import CoinList from '../fixtures/coin-list.json'
import { useStore } from '../store'
import type { Coin } from '../types'
import Input from '../atoms/input.vue'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const { trackCoin, unTrackCoin, trackingCoins } = useStore()

const search = ref('')
const caseSensitive = ref(false)
const selectedOnly = ref(false)
const casedSearch = computed(() =>
  caseSensitive.value ? search.value : search.value.toLowerCase(),
)
// const coinList = computed(() => selectedOnly.value ? trackingCoins : CoinList)
const coinList = computed(() => {
  if (selectedOnly.value)
    return trackingCoins.value

  return CoinList
})
const filteredCoinList = computed(() => {
  if (search.value) {
    return coinList.value.filter((coin) => {
      let symbol = coin.symbol.toLowerCase()
      let name = coin.name.toLowerCase()

      if (caseSensitive.value) {
        symbol = coin.symbol.toUpperCase()
        name = coin.name
      }

      return (
        symbol.includes(casedSearch.value) || name.includes(casedSearch.value)
      )
    })
  }

  return coinList.value
})

function onCheckCoin(checked: boolean, coin: Coin) {
  if (checked)
    trackCoin(coin)
  else unTrackCoin(coin)
}

function getIsTracking(coin: Coin) {
  return trackingCoins.value.findIndex(i => i.id === coin.id) >= 0
}
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex items-center gap-x-4 px-2">
      <Input v-model="search" placeholder="Filter" class="w-2/5" />
      <span class="inline-flex gap-x-2">
        <Checkbox v-model:checked="caseSensitive" class="text-sm leading-tight">
          Case sensitive
        </Checkbox>
        <Checkbox v-model:checked="selectedOnly" class="text-sm leading-tight">
          Selected only
        </Checkbox>
      </span>
    </div>

    <div>
      <p class="text-sm mb-1 text-neutral-500 px-2">
        Check to track coin price
      </p>

      <RecycleScroller
        class="h-[400px] -mr-2"
        :items="filteredCoinList"
        :item-size="24"
        :buffer="300"
        :prerender="20"
        key-field="id"
      >
        <template
          #default="{ item: coin, index }: { item: Coin, index: number }"
        >
          <div
            :class="[
              'rounded px-2',
              'hover:bg-opacity-70 hover:bg-neutral-200 dark:hover:bg-neutral-700',
              index % 2 !== 0 && 'bg-neutral-100 dark:bg-neutral-800',
            ]"
          >
            <Checkbox
              :checked="getIsTracking(coin)"
              class="w-full py-0.5"
              @update:checked="(checked) => onCheckCoin(checked, coin)"
            >
              <span class="w-full inline-grid grid-cols-4 gap-x-1">
                <span class="uppercase truncate col-span-1">
                  {{ coin.symbol }}
                </span>
                <span class="truncate col-span-3">{{ coin.name }}</span>
              </span>
            </Checkbox>
          </div>
        </template>
      </RecycleScroller>
    </div>
  </div>
</template>
