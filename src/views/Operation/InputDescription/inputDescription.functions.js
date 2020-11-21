import {setPageOptions} from '@/store/actions/pagesActions'
import {MAX_LENGTH_DESCRIPTION_OPERATION, PAGES} from '@/constants/constants'
import store from '@/store/store'


const {dispatch, getState} = store

export function change(description) {
  const operation = getState().pages[PAGES.OPERATION].operation
  const options = {operation: {
    ...operation,
    description: description.slice(0, MAX_LENGTH_DESCRIPTION_OPERATION)
  }}
  dispatch(setPageOptions(PAGES.OPERATION, options))
}
