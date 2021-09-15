import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element3/lib/theme-chalk/index.css'
import Element3 from 'element3'
import store from './store'

const app = createApp(App)
app.use(router)
app.use(Element3)
app.use(store)
app.mount('#app')
