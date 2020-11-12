import store from '@/store/store'
import {setPageOptions} from '@/store/actions/pagesActions'
import {PAGES} from '@/constants/constants'
import {nextPage} from '@/store/actions/appActions'


const {dispatch, getState} = store

export function getItem(typeOperation, objOperation) {
  const obj = objOperation
  const {wallets, categories} = getState()

  if (obj.type === 'wallet') return wallets.find(w => w.id === obj.itemID) || {}
  else return categories[typeOperation].find(c => c.id === obj.itemID) || {}
}

export function click(operation) {
  const options = {operation, initOperation: operation}
  dispatch(setPageOptions(PAGES.OPERATION, options))
  dispatch(nextPage({view: PAGES.OPERATION}))
}
