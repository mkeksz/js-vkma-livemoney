import {PAGES} from '@/constants/constants'
import {setPageOptions} from '@/store/actions/pagesActions'
import {inputBalanceFilter} from '@/filters/numbersFilter'
import store from '@/store/store'


const {dispatch, getState} = store

export function change(value) {
  const operation = getState().pages[PAGES.OPERATION].operation
  const options = {operation: {...operation, amount: inputBalanceFilter(value)}}
  dispatch(setPageOptions(PAGES.OPERATION, options))
}
