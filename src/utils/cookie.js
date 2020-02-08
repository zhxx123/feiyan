export const expireHour = 2

export function getCookie(name) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)
  if (arr) { return unescape(arr[2]) } else { return false }
}

export function setCookie(c_name, value, expirehour) {
  const hour = expirehour || 2
  let expires = ''
  const date = new Date(new Date().getTime() + hour * 60 * 60 * 1000)
  expires = '; expires=' + date.toUTCString()

  const cookie = [
    c_name + '=' + escape(value),
    expires,
    '; path=/'
  ].join('')
  document.cookie = cookie
}

export function delCookie(name) {
  const exp = new Date()
  exp.setTime(exp.getTime() - 1)
  const cval = getCookie(name)
  if (cval != null) { document.cookie = '' }
}
