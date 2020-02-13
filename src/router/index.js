import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 404 not fund
// import NotFound from '@/views/NotFound.vue'
const router = new Router({
  // mode: 'history', // 不显示 "#"路由地址
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/tanghe'// 设置默认指向的路径
    },
    {
      path: '/tanghe',
      name: 'tanghe',
      component: () => import('@/views/Home/tanghe.vue')
    },
    {
      path: '/nanyang',
      name: 'nanyang',
      component: () => import('@/views/Home/nanyang.vue')
    },
    {
      path: '/henan',
      name: 'henan',
      component: () => import('@/views/Home/henan.vue')
    },
    {
      path: '/china',
      name: 'china',
      component: () => import('@/views/Home/china.vue')
    },
    {
      path: '/logs',
      name: 'logs',
      component: () => import('@/views/logs.vue')
    },
    {
      path: '**', // 错误路由
      redirect: '/notfound' // 重定向
    }
  ]
})
export default router
