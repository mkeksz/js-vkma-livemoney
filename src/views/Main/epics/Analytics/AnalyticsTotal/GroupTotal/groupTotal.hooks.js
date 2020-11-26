import {useMemo} from 'react'
import {getTotalAmounts} from '@/shared/analytics'


export function useAmounts(amounts) {
  return useMemo(() => getTotalAmounts(amounts), [amounts])
}

export function useDateHeader(date) {
  return useMemo(() => {
    const _date = new Date(date)
    _date.setUTCMonth(_date.getUTCMonth() + 1)
    const options = {month: 'long'}
    return `${_date.toLocaleDateString('ru', options)} ${_date.getFullYear()}`
  }, [date])
}
