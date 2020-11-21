export function percentNumOfNum(a, b) {
  return a / b * 100
}

export function stringToNumber(string) {
  if (!string) return 0
  try {
    string = string.toString()
    if (string === '-') string = ''
    return +(string.replace(',', '.'))
  } catch {
    return 0
  }
}
