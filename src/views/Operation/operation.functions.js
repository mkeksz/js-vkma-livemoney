import {hideLoader, prevPage, showLoader} from '@/store/actions/appActions'
import {setOperations} from '@/store/actions/operationsActions'
import {setWallets} from '@/store/actions/walletsActions'
import {setCategories} from '@/store/actions/categoriesActions'
import {addAmountToCategories} from '@/shared'
import {StateProcessor} from '@/core/StateProcessor'
import store from '@/store/store'

export function save(operation, initialOperation) {
  store.dispatch(showLoader())
  StateProcessor.saveOperation(operation, initialOperation).then(saveAndClose)
}

export function del(operationID) {
  store.dispatch(showLoader())
  StateProcessor.deleteOperation(operationID).then(saveAndClose)
}

function saveAndClose({operations, wallets}) {
  const categories = store.getState().categories
  store.dispatch(setOperations(operations))
  store.dispatch(setWallets(wallets))
  store.dispatch(setCategories(addAmountToCategories(categories)))
  store.dispatch(hideLoader())
  store.dispatch(prevPage())
}
