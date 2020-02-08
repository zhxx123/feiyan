import { uuid } from 'vue-uuid'
import BigNumber from 'bignumber.js'
export function getUUID() {
  const uid = uuid.v1()
  const res = uid.split('-').join('')
  return res
}
// 格式化(小数点)
// x.toFormat() // '123,456,789.123456789'
// x.toFormat(3) // '123,456,789.123'
export function FormatNumber(value) {
  const x = new BigNumber(value)
  return x.toFormat()
}

export function floatToFixedUp(value, digist) {
  // 进位截取
  const BigNumberFmt = {
    decimalSeparator: '.',
    groupSeparator: '',
    groupSize: 0
  }
  const tmpNumber = new BigNumber(value).toFormat(digist, BigNumber.ROUND_UP, BigNumberFmt)
  return new BigNumber(tmpNumber).toNumber()
//   return new BigNumber(value).toFormat(digist, BigNumber.ROUND_UP)
}

export function floatCompredEqual(num1, num2) {
  const x = new BigNumber(num1)
  const y = new BigNumber(num2)
  return x.comparedTo(y)
}
