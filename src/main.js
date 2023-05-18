import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router/router'
import store from './store/store.js';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
