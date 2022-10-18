import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueSafeTeleport from 'vue-safe-teleport'

const app = createApp(App)
app.use(VueSafeTeleport)
app.mount('#app')
