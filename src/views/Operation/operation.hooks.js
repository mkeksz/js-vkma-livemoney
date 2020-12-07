import {useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {KEYS_STORAGE_VK, PAGES as P} from '@/constants/constants'
import {getDifDatesInDays} from '@/core/utils/date'
import {setPageOptions} from '@/store/actions/pagesActions'
import {nextAnchor} from '@/views/Operation/operation.functions'
import {setTooltip} from '@/store/actions/tooltipActions'
import {storageSet} from '@/core/bridge'


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
    setTimeout(() => nextAnchor(anchors), 350)
  }, [])
}

export function useTooltips() {
  const dispatch = useDispatch()

  const showTooltips = useSelector(({tooltips}) => tooltips.operation)

  const [fromShow, setFromShow] = useState(showTooltips)
  const [toShow, setToShow] = useState(false)
  const [sumShow, setSumShow] = useState(false)

  const fromOn = useMemo(() => () => {
    dispatch(setTooltip('operation', false))
    storageSet(KEYS_STORAGE_VK.TOOLTIP_OPERATION, 'true')
    setFromShow(false)
    setToShow(true)
  }, [])

  const toOn = useMemo(() => () => {
    setToShow(false)
    setSumShow(true)
  }, [])

  const sumOn = useMemo(() => () => {
    setSumShow(false)
  }, [])

  return {
    from: {show: fromShow, on: fromOn},
    to: {show: toShow, on: toOn},
    sum: {show: sumShow, on: sumOn}
  }
}
