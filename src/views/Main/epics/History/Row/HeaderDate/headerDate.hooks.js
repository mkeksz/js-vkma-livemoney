import {useMemo} from 'react'
import {compareDates, toSaveDate} from '@/core/utils/date'

export function useStringDate(date) {
  return useMemo(() => {
    date = toSaveDate(date)

    const todayDate = new Date()
    const yesterdayDate = new Date()
    yesterdayDate.setDate(yesterdayDate.getDate() - 1)

    if (compareDates(date, todayDate)) return 'Сегодня'
    else if (compareDates(date, yesterdayDate)) return 'Вчера'

    return date.toLocaleString('ru', {
      month: 'long', day: 'numeric', weekday: 'short'
    })
  }, [date])
}
