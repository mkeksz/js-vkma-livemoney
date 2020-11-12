export function formatDateToStringDate(date) {
  date = toSaveDate(date)
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

export function compareDates(a, b, withoutDay = false) {
  a = toSaveDate(a)
  b = toSaveDate(b)

  return (withoutDay || a.getDate() === b.getDate())
    && a.getMonth() === b.getMonth()
    && a.getFullYear() === b.getFullYear()
}

export function getDifDatesInDays(a, b) {
  a = getDateWithoutTime(toSaveDate(a))
  b = getDateWithoutTime(toSaveDate(b))
  const oneDay = 1000 * 60 * 60 * 24
  const different = Math.abs(a.getTime() - b.getTime())
  return Math.ceil( different / oneDay)
}

export function toSaveDate(date) {
  return date ? new Date(date) : new Date()
}

export function getDateWithoutTime(date) {
  date = toSaveDate(date)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}
