import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import './global.css'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import mock from '@/mock'
import './assets/iconfont/iconfont.js'
import SvgIcon from '@/components/SvgIcon.vue'

if (import.meta.env.MODE === 'development') {
  mock()
}
const app = createApp(App)
// 全量导入elementPluseIcon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.component('SvgIcon', SvgIcon)
app.mount('#app')
