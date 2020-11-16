import {setPageOptions} from '@/store/actions/pagesActions'
import {PAGES, TYPES_CATEGORY as TC} from '@/constants/constants'
import {nextPage} from '@/store/actions/appActions'
import store from '@/store/store'


const {dispatch} = store

export function click(category) {
  dispatch(setPageOptions(PAGES.CATEGORY, {category, type: TC.EXPENSE}))
  dispatch(nextPage({view: PAGES.CATEGORY}))
}
