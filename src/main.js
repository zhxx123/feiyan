import Vue from 'vue'

import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/index'
// import i18n from './utils/lang'
import UUID from 'vue-uuid'
import axios from 'axios'
import './icons' // icon
Vue.use(UUID)
Vue.prototype.$http = axios
// import Cookies from 'js-cookie'

// import 'normalize.css/normalize.css' // a modern alternative to CSS resets

// import './styles/element-variables.scss'

// import '@/styles/index.scss' // global css
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/common.css'
import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

import DataTables from 'vue-data-tables'

Vue.use(DataTables)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI, {
  size: 'medium'
//   i18n: (key, value) => i18n.t(key, value)
})

// 定义全局变量
new Vue({
  el: '#app', // 挂载点
  // i18n,
  store,
  router,
  components: { App },
  template: '<App/>' // 根组件
})

// 加入百度统计
router.beforeEach((to, from, next) => {
  if (to.path) {
    if (window._hmt) {
      window._hmt.push(['_trackPageview', '/#' + to.fullPath])
    }
  }
  next()
})
