export function storage(key, data = null) {
  if (!data) return JSON.parse(localStorage.getItem(key))
  localStorage.setItem(key, JSON.stringify(data))
}

export function percentNumOfNum(a, b) {
  return a / b * 100
}

export function formatDateToStringDate(date) {
  if (typeof date === 'string') date = new Date(date)
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

export function compareDates(a, b) {
  return a.getDate() === b.getDate()
    && a.getMonth() === b.getMonth()
    && a.getFullYear() === b.getFullYear()
}
