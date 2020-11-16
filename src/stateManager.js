import React from 'react'
import {MAX_OPERATIONS_PER_MONTH} from '@/constants/constants'
import {bridgeAppGetUserInfo} from '@/core/bridge'
import {setPopout, setTimezone} from '@/store/actions/appActions'
import {setUser} from '@/store/actions/userActions'
import {setWallets} from '@/store/actions/walletsActions'
import {setCategories} from '@/store/actions/categoriesActions'
import {addAmountToCategories} from '@/shared/categories'
import {setOperations} from '@/store/actions/operationsActions'
import {setAnalytics} from '@/store/actions/analyticsActions'
import {PopoutWarn} from '@/components/UI/PopoutWarn/PopoutWarn'
import {getMessageError} from '@/filters/errorFilter'
import {StateProcessor, StateProcessor as SP} from '@/core/StateProcessor'
import store from '@/store/store'


const {dispatch, getState} = store

export async function fetchInitData() {
  const userInfo = await bridgeAppGetUserInfo()

  SP.userID = userInfo['id']

  const [wallets, user, categories, operations, analytics] = await Promise
      .all([
        SP.getWallets(),
        SP.getUser(),
        SP.getCategories(),
        SP.getOperations(0, MAX_OPERATIONS_PER_MONTH),
        SP.getAnalytics(0, 12)
      ])

  dispatch(setTimezone(userInfo['timezone']))
  dispatch(setUser(user))
  dispatch(setWallets(wallets))
  dispatch(setCategories(addAmountToCategories(categories, analytics)))
  dispatch(setOperations(operations))
  dispatch(setAnalytics(analytics))
}


export async function saveWallet(wallet) {
  storeDataWallets(await SP.saveWallet(wallet))
}

export async function deleteWallet(walletID) {
  storeDataWallets(await SP.deleteWallet(walletID))
}

function storeDataWallets(data) {
  if (catchError(data)) return
  dispatch(setWallets(data))
}


export async function saveOperation(operation, initOperation) {
  storeDataOperations(await SP.saveOperation(operation, initOperation))
}

export async function deleteOperation(operationID) {
  storeDataOperations(await SP.deleteOperation(operationID))
}

function storeDataOperations(data) {
  if (catchError(data)) return
  const {operations, wallets, analytics} = data
  const categories = getState().categories
  dispatch(setOperations(operations))
  dispatch(setWallets(wallets))
  dispatch(setCategories(addAmountToCategories(categories, analytics)))
  dispatch(setAnalytics(analytics))
}


export async function saveCategory(category, type) {
  storeDataCategories(await StateProcessor.saveCategory(category, type))
}

export async function deleteCategory(categoryID, type) {
  storeDataCategories(await StateProcessor.deleteCategory(categoryID, type))
}

function storeDataCategories(data) {
  if (catchError(data)) return
  store.dispatch(setCategories(data))
}


function catchError(data) {
  if (data.error) {
    const message = getMessageError(data.error)
    dispatch(setPopout(<PopoutWarn text={message.text} title={message.title}/>))
    return true
  }
  return false
}
