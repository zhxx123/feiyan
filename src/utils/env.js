/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 */
import apiUrl from '../utils/apiUrl'

let baseUrl = ''
const routerMode = 'history'

if (process.env.NODE_ENV === 'development') {
  baseUrl = ' https://easy-mock.com/mock/5d5220d82fc19222baad0d6b'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = apiUrl
}

export default {
  baseUrl,
  routerMode
}
