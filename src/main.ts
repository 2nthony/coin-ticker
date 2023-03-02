import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import './core/app'
import './core/web'
import 'uno.css'

createApp(App).use(router).mount('#app')
