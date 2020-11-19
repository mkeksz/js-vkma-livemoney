import {useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {PAGES} from '@/constants/constants'
import {setPageOptions} from '@/store/actions/pagesActions'


export function useSlideTotal(countSlides) {
  const dispatch = useDispatch()
  const {slideTotal} = useSelector(({pages}) => pages[PAGES.ANALYTICS])

  return useMemo(() => {
    let slide = slideTotal
    if (!slideTotal && slideTotal !== 0) {
      dispatch(setPageOptions(PAGES.ANALYTICS, {slideTotal: countSlides - 1}))
      slide = countSlides - 1
    }
    return slide
  }, [dispatch, slideTotal, countSlides])
}
