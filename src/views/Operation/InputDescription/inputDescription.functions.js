import {setPageOptions} from '@/store/actions/pagesActions'
import {PAGES} from '@/constants/constants'
import store from '@/store/store'


const {dispatch, getState} = store

export function change(description) {
  const operation = getState().pages[PAGES.OPERATION].operation
  const options = {operation: {...operation, description}}
  dispatch(setPageOptions(PAGES.OPERATION, options))
}
