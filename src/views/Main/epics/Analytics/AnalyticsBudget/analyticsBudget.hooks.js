import {useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {PAGES} from '@/constants/constants'
import {setPageOptions} from '@/store/actions/pagesActions'


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
