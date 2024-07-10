import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //持久化

import '@/styles/common.scss'
import App from './App.vue'
import router from './router'
// 引用全局指令并注册
import { lazyPlugin } from '@/directives/index'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)

app.mount('#app')
