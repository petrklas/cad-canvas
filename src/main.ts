import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import Engine from './models/Engine'

import './assets/global.css';    

const engine = new Engine();
createApp(App)
    .use(createPinia())
    .provide('engine', engine)
    .mount('#app')
