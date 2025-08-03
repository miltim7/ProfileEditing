// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

// Импортируем стили Quill
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

const app = createApp(App)

app.config.devtools = false
app.mount('#app')