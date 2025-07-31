// src\main.js

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.config.devtools = false
app.mount('#app')