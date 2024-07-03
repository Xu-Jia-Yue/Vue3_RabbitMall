import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/styles/common.scss'
import App from './App.vue'
import router from './router'
// 引用全局指令并注册
import { lazyPlugin } from '@/directives/index'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)

app.mount('#app')
