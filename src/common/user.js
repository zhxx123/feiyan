import { setCookie, getCookie, expireHour } from '@/utils/cookie'
import Cookies from 'js-cookie'
const userEmailKey = 'mgdUserEmail'

function getUserEmail() {
  return getCookie(userEmailKey)
}
function setUserEmail(useremail) {
  return setCookie(userEmailKey, useremail, expireHour)
}
function removeUserEmail() {
  return Cookies.remove(userEmailKey)
}
const userNameKey = 'mgdUserName'

function getUserName() {
  return getCookie(userNameKey)
}
function setUserName(userename) {
  return setCookie(userNameKey, userename, expireHour)
}
function removeUserName() {
  return Cookies.remove(userNameKey)
}

export { getUserEmail, setUserEmail, removeUserEmail, getUserName, setUserName, removeUserName }
