import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element3/lib/theme-chalk/index.css'
import Element3 from 'element3'
import store from './store'

createApp(App)
  .use(router)
  .use(Element3)
  .use(store)
  .mount('#app')