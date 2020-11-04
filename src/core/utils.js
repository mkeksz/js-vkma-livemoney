export function storage(key, data = null) {
  if (!data) return JSON.parse(localStorage.getItem(key))
  localStorage.setItem(key, JSON.stringify(data))
}

export function percentNumOfNum(a, b) {
  return a / b * 100
}
