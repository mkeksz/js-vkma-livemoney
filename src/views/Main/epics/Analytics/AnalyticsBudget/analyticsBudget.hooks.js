import {useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {KEYS_STORAGE_VK, PAGES} from '@/constants/constants'
import {setPageOptions} from '@/store/actions/pagesActions'
import {setTooltip} from '@/store/actions/tooltipActions'
import {storageSet} from '@/core/bridge'


export function useSlideBudget(countSlides) {
  const dispatch = useDispatch()
  const {slideBudget} = useSelector(({pages}) => pages[PAGES.ANALYTICS])

  return useMemo(() => {
    let slide = slideBudget
    if (!slideBudget && slideBudget !== 0) {
      dispatch(setPageOptions(PAGES.ANALYTICS, {slideBudget: countSlides - 1}))
      slide = countSlides - 1
    }
    return slide
  }, [dispatch, slideBudget, countSlides])
}


export function useTooltips() {
  const dispatch = useDispatch()

  const showTooltips = useSelector(({tooltips}) => tooltips.analytics)

  const [startShow, setStartShow] = useState(showTooltips)
  const [settingsShow, setSettingsShow] = useState(false)

  const startOn = useMemo(() => () => {
    dispatch(setTooltip('analytics', false))
    storageSet(KEYS_STORAGE_VK.TOOLTIP_ANALYTICS, 'true')
    setStartShow(false)
    setSettingsShow(true)
  }, [])

  const settingsOn = useMemo(() => () => {
    setSettingsShow(false)
  }, [])

  return {
    start: {show: startShow, on: startOn},
    settings: {show: settingsShow, on: settingsOn}
  }
}
