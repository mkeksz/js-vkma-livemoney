import {formatDateToStringDate} from '@/core/utils/date'


export function hasHeader(operation, prevOperation) {
  const stringDate = formatDateToStringDate(operation.date)

  if (prevOperation) {
    const prevStringDate = formatDateToStringDate(prevOperation.date)
    if (prevStringDate !== stringDate) return 'prev'
    return false
  } else return 'current'
}
