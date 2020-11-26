import React from 'react'
import {parse} from 'querystring'
import {setPopout} from '@/store/actions/appActions'
import {setUser} from '@/store/actions/userActions'
import {setWallets} from '@/store/actions/walletsActions'
import {setCategories} from '@/store/actions/categoriesActions'
import {addAmountToCategories} from '@/shared/categories'
import {setOperations} from '@/store/actions/operationsActions'
import {setAnalytics} from '@/store/actions/analyticsActions'
import {PopoutWarn} from '@/components/UI/PopoutWarn/PopoutWarn'
import {getMessageError} from '@/filters/errorFilter'
import {setColors} from '@/store/actions/colorsActions'
import {setIcons} from '@/store/actions/iconsActions'
import {ERRORS} from '@/constants/constants'
import {StateProcessor, StateProcessor as SP} from '@/core/StateProcessor'
import store from '@/store/store'


const {dispatch, getState} = store

export async function fetchInitData() {
  SP.params = location.search
  SP.parsedParams = parse(SP.params.slice(1))
  SP.userID = SP.parsedParams['vk_user_id']

  const authData = await SP.getAuthData()
  if (authData['error']) throw authData

  const {user, wallets, categories, analytics, operations, colors, icons
  } = authData

  dispatch(setUser(user))
  dispatch(setWallets(wallets))
  dispatch(setCategories(addAmountToCategories(categories, analytics)))
  dispatch(setOperations(operations))
  dispatch(setAnalytics(analytics))
  dispatch(setColors(colors))
  dispatch(setIcons(icons))
}


export async function saveWallet(wallet) {
  storeDataWallets(await SP.saveWallet(wallet))
}

export async function deleteWallet(walletID) {
  storeDataWallets(await SP.deleteWallet(walletID))
}

function storeDataWallets(data) {
  if (catchError(data)) return
  dispatch(setWallets(data.result))
}


export async function saveOperation(operation) {
  storeDataOperations(await SP.saveOperation(operation))
}

export async function deleteOperation(operationID) {
  storeDataOperations(await SP.deleteOperation(operationID))
}

function storeDataOperations(data) {
  if (catchError(data)) return
  const {operations, analytics, wallets} = data.result
  const categories = getState().categories
  dispatch(setOperations(operations))
  dispatch(setWallets(wallets))
  dispatch(setCategories(addAmountToCategories(categories, analytics)))
  dispatch(setAnalytics(analytics))
}


export async function saveCategory(category) {
  storeDataCategories(await StateProcessor.saveCategory(category))
}

export async function deleteCategory(categoryID) {
  storeDataCategories(await StateProcessor.deleteCategory(categoryID))
}

function storeDataCategories(data) {
  if (catchError(data)) return
  store.dispatch(setCategories(data.result))
}


function catchError(data) {
  if (data.error) {
    const message = getMessageError(data.error.code)
    dispatch(setPopout(<PopoutWarn text={message.text} title={message.title}/>))
    return true
  } else if (!data.result) {
    const message = getMessageError(ERRORS.NOT_RESULT)
    dispatch(setPopout(<PopoutWarn text={message.text} title={message.title}/>))
    return true
  }
  return false
}
