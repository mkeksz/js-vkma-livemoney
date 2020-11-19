import store from '@/store/store'
import {setPageOptions} from '@/store/actions/pagesActions'
import {PAGES} from '@/constants/constants'
import {nextPage} from '@/store/actions/appActions'


const {dispatch, getState} = store

export function getItem(typeOperation, objOperation) {
  const obj = objOperation
  const {wallets, categories} = getState()
  const _categories = categories.filter(c => c.type === typeOperation)

  if (obj.type === 'wallet') return wallets.find(w => w.id === obj.id) || {}
  else return _categories.find(c => c.id === obj.id) || {}
}

export function click(operation) {
  const options = {operation, initOperation: operation}
  dispatch(setPageOptions(PAGES.OPERATION, options))
  dispatch(nextPage({view: PAGES.OPERATION}))
}
