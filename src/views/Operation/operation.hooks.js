import {useDispatch} from 'react-redux'
import {PAGES as P} from '@/constants/constants'
import {useEffect, useMemo} from 'react'
import {getDifDatesInDays} from '@/core/utils/date'
import {setPageOptions} from '@/store/actions/pagesActions'
import {nextAnchor} from '@/views/Operation/operation.functions'


export function useDifDates(a) {
  const curDate = useMemo(() => new Date(), [])
  return useMemo(() => {
    const difDates = getDifDatesInDays(a, curDate)
    return difDates > 3 ? 3 : difDates
  }, [a, curDate])
}

export function useCorrectChoosedDate(difDates) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageOptions(P.OPERATION, {choosedDate: 7 - difDates}))
  }, [dispatch])
}

export function useScroll(anchors) {
  useEffect(() => {
    setTimeout(() => nextAnchor(anchors), 700)
  }, [])
}
