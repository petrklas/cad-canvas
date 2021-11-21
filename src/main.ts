import { createApp } from 'vue'
import { store, key } from "./store";
import App from './App.vue'
import './assets/global.css'

createApp(App)
.use(store, key)
.mount('#app')
