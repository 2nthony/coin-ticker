import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import "./web-enhancement";
import "./core/app";
import "uno.css";

createApp(App).use(router).mount("#app");
