export function currencyFilter(value, icon = true) {
  return (
    new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
      maximumFractionDigits: 2
    }).format(value) + (icon ? ' ₽' : '')
  )
}

export function inputBalanceFilter(value) {
  let result = value.toString()

  result = result.replace('.', ',')
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
  if (tmpResult[0].length > 12) {
    tmpResult[0] = tmpResult[0].slice(0, 12)
    if (tmpResult.length > 1) {
      result = tmpResult[0] + ',' + tmpResult[1]
    } else {
      result = tmpResult[0]
    }
  }

  return result
}
