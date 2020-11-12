import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {PAGES as P} from '@/constants/constants'
import {MAX_CHOOSED_DAY} from '../operation.constants'
import {useDifDates} from '../operation.hooks'
import {toSaveDate} from '@/core/utils/date'

export function useCalendar() {
  const {operation} = useSelector(({pages}) => pages[P.OPERATION])
  const difDates = useDifDates(operation.date)
  return useMemo(() => {
    const isEdit = !!operation.id
    const maxDay = MAX_CHOOSED_DAY - 1
    const _date = toSaveDate(operation.date)
    const correctDay = isEdit ? maxDay - difDates : maxDay
    _date.setDate(_date.getDate() - correctDay)
    return _date
  }, [operation.date, operation.id])
}
