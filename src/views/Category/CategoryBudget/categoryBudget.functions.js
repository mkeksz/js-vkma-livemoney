import {PAGES} from '@/constants/constants'
import {setPageOptions} from '@/store/actions/pagesActions'
import {inputBalanceFilter} from '@/filters/numbersFilter'
import store from '@/store/store'


const {dispatch, getState} = store

export function change(budget) {
  const category = getState().pages[PAGES.CATEGORY].category
  const options = {category: {...category, budget: inputBalanceFilter(budget)}}
  dispatch(setPageOptions(PAGES.CATEGORY, options))
}
