<template>
  <ul>
    <li v-for="coin in CoinList" :key="coin.id">
      {{ coin.symbol }}-{{ coin.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import CoinList from "../fixtures/coin-list.json";
</script>
