<script setup lang="ts">
import Greet from "./components/Greet.vue";
import NavBar from "./components/nav-bar.vue";
</script>

<template>
  <div class="container space-y-4">
    <NavBar />

    <RouterView />
    <!-- <RouterView #="{ Component }">
      <Transition>
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </Transition>
    </RouterView> -->

    <Greet />
  </div>
</template>
