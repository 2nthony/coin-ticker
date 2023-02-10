import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "./screens/home.vue";
import SelectCoins from "./screens/select-coins.vue";
import Options from "./screens/options.vue";
import About from "./screens/about.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
    meta: {
      label: "My List",
    },
  },
  {
    path: "/select-coins",
    component: SelectCoins,
    meta: {
      label: "Select Coins",
    },
  },
  {
    path: "/options",
    component: Options,
    meta: {
      label: "Options",
    },
  },
  {
    path: "/about",
    component: About,
    meta: {
      label: "About",
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
