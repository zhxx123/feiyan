import Cookies from 'js-cookie'
import { delCookie, setCookie, getCookie, expireHour } from '@/utils/cookie'

const TokenKey = 'mgdAccessToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserToken() {
  return getCookie(TokenKey)
}

export function setUserToken(token) {
  return setCookie(TokenKey, token, expireHour)
}

export function removeUserToken() {
  return delCookie(TokenKey)
}
