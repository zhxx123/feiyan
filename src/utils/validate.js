
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
// 自定义验证器
// 添加一个简单的手机号验证
// 匹配0-9之间的数字,并且长度是11位
// 正则验证
// 主要用于限制输入内容
// 1.value ---数据（输入的内容）
// 2.返回  ---限制过后的数据
// 3.正则编写规则，使用的是.replace()替换，所以正则填写的规则应该是非法的数据的正则，讲其替换成空
// 举例：如果登录页面，账号不能输入中文，value传过来的是'admin我'，经过方法返回后的数据是 'admin'
const valid = {
  // 只允许数字
  onlynumber(value) {
    return value.replace(/\D/g, '')
  },
  // 只允许数字,字母
  onlyZorN(value) {
    return value.replace(/[^\w\.\/]/g, '')
  },
  // 不允许中文和空格
  noCork(value) {
    return value.replace(/[\u4E00-\u9FA5\s]/g, '')
  },
  // 不允许空格
  noK(value) {
    return value.replace(/\s/g, '')
  },
  // 只能输入数字，小数点，不能有空格
  nolyNorD(value) {
    return value.replace(/[^0-9\.\/]/g, '')
  },
  // 11 位 手机号码, 1 开头
  mobile(value) {
    return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  },
  // email,成功返回真,否则返回
  email(value) {
    return value.replace(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, '')
  }
}

const regex = {
  passwordReg: /^.*(?=.{6,16})(?=.*\d)(?=.*[a-zA-Z]{1,})(?=.*[!@#$%^&*?\(\)]).*$/,
  emailReg: /^[a-z0-9A-Z]+([-|_|\.]+[a-z0-9A-Z]+)*@([a-z0-9A-Z]+[-|\.])+[a-zA-Z]{2,5}$/,
  phoneReg: /^1[34578]\d{9}$/,
  captchaCodeReg: /^\d{4}$/,
  verifyCodeReg: /^\d{6}$/
}

export { valid, regex }
