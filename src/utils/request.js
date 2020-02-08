// import { cookie } from '../../static/js/util'
import router from '@/router'

import axios from 'axios'
import { MessageBox } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/common/auth'

// create an axios instance
const service = axios.create({
  baseURL: '/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求 拦截器 interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.usertoken) {
      config.headers.Accept = 'application/json'
      const token = store.getters.usertoken // getToken()
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应 拦截器 response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 2000) {
    //   // 2002: 账户已经被锁定;
    //   if (res.status === 2002) {
    //     Message({
    //       message: res.msg || 'Error',
    //       showClose: true,
    //       type: 'error',
    //       duration: 5 * 1000
    //     })
    //     store.dispatch('user/resetToken')
    //     return Promise.reject(new Error(res.msg || 'Error'))
    //   }
      // 2002: token 已经过期
      if (res.status === 2002) {
        MessageBox.confirm('你已经退出登录, 你可以取消留在当前页面，或者重新登录', '确认登出', {
          confirmButtonText: '重新登录',
          //   cancelButtonText: '取消',
          showClose: false,
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken')
          router.replace({
            path: '/login'
            // query: { redirect: router.currentRoute.fullPath }
          })
        //   window.location.reload()
        })
        return res
      }
      return res
    } else {
      return res
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          store.dispatch('user/resetToken')
          router.replace({
            path: '/login'
            // query: { redirect: router.currentRoute.fullPath }
          })
          //   MessageBox.alert('登录超时，请重新登录', '登录超时', {
          //     confirmButtonText: '重新登录',
          //     // cancelButtonText: '取消',
          //     type: 'warning'
          //   })
          break
        case 403:
          this.$message({
            showClose: true,
            message: '你没有操作权限',
            type: 'warning'
          })
          break
      }
      return Promise.reject(error)
    }
  }
)
export default service
