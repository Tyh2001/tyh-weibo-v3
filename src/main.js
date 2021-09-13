import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element3/lib/theme-chalk/index.css'
import Element3 from 'element3'

const app = createApp(App)
app.use(router)
app.use(Element3)
app.mount('#app')
