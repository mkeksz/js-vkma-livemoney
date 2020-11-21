import {stringToNumber} from '@/core/utils/number'
import {MAX_BALANCE, MAX_LENGTH_INPUT_BALANCE} from '@/constants/constants'

export function currencyFilter(value, icon = true) {
  value = stringToNumber(value)
  if (value > MAX_BALANCE) value = MAX_BALANCE
  else if (value < -MAX_BALANCE) value = -MAX_BALANCE
  icon = icon ? ' ₽' : ''

  const options = {style: 'decimal', maximumFractionDigits: 2}
  return new Intl.NumberFormat('ru-RU', options).format(value) + icon
}

export function inputBalanceFilter(value, isMinus = false) {
  if (!value) return ''
  let result = value.toString()

  result = result.replace('.', ',')
  let minus = ''
  if (isMinus) {
    result = result.replace(/[^-,\d]/g, '')
    minus = result[0] === '-' ? '-' : ''
  }
  result = result.replace(/[^,\d]/g, '')

  let newRes = result.split(',')
  result = ''
  newRes.forEach((item, i) => {
    if (i === 1) {
      result += ','
    }
    result += item
  })

  newRes = result.split(',')
  result = ''
  newRes.forEach((item, i) => {
    if (i === 1) {
      result += ','
      if (item.length > 2) result += item.charAt(0) + item.charAt(1)
      else result += item
      return
    }
    result += item
  })

  for (let i = 0; i < result.length; i++) {
    if (result.charAt(0) === '0' && result.charAt(1)) {
      result = result.slice(1)
    } else break
  }

  if (result.charAt(0) === ',') {
    result = '0' + result
  }

  const tmpResult = result.split(',')
  if (tmpResult[0].length > MAX_LENGTH_INPUT_BALANCE - 3) {
    tmpResult[0] = tmpResult[0].slice(0, MAX_LENGTH_INPUT_BALANCE - 3)
    if (tmpResult.length > 1) {
      result = tmpResult[0] + ',' + tmpResult[1]
    } else {
      result = tmpResult[0]
    }
  }

  return minus+result
}
