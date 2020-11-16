import store from '@/store/store'
import {nextPage} from '@/store/actions/appActions'
import {PAGES, TYPES_CATEGORY as TC} from '@/constants/constants'
import {setPageOptions} from '@/store/actions/pagesActions'


const {dispatch} = store

export function openCategories(date = null) {
  dispatch(setPageOptions(PAGES.CATEGORIES, {date, tab: TC.EXPENSE}))
  dispatch(nextPage({view: PAGES.CATEGORIES}))
}

export function getBudgets(categories) {
  return categories.filter(cat => cat.budget > 0)
}
