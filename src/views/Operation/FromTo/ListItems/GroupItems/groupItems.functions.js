import {DIRECTION} from '@/views/Operation/operation.constants'
import {PAGES} from '@/constants/constants'
import {clearPageOptions, setPageOptions} from '@/store/actions/pagesActions'
import {nextPage} from '@/store/actions/appActions'
import store from '@/store/store'


const dispatch = store.dispatch
const getState = store.getState

export function clickItem(direction, type, id) {
  const {operation} = getState().pages[PAGES.OPERATION]

  if (direction === DIRECTION.FROM) {
    dispatch(setPageOptions(PAGES.OPERATION, {
      operation: {...operation, from: {type, id}}
    }))
  } else {
    dispatch(setPageOptions(PAGES.OPERATION, {
      operation: {...operation, to: {type, id}}
    }))
  }
}

export function clickNew(type) {
  if (type) {
    dispatch(clearPageOptions(PAGES.CATEGORY))
    dispatch(setPageOptions(PAGES.CATEGORY, {type}))
    dispatch(nextPage({view: PAGES.CATEGORY}))
  } else {
    dispatch(clearPageOptions(PAGES.WALLET))
    dispatch(nextPage({view: PAGES.WALLET}))
  }
}

export function isChecked(itemD, item, type) {
  return itemD && itemD.id === item.id && itemD.type === type
}

