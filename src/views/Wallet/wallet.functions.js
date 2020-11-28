import React from 'react'
import {PAGES} from '@/constants/constants'
import {DEFAULT_TITLE} from '@/views/Wallet/wallet.constants'
import {PopoutAlert} from '@/components/UI/PopoutAlert/PopoutAlert'
import {setPageOptions} from '@/store/actions/pagesActions'
import {prevPage, setPopout} from '@/store/actions/appActions'
import {deleteWallet, saveWallet as saveWal} from '@/stateManager'
import {stringToNumber} from '@/core/utils/number'
import {removeWallet, saveWallet} from '@/store/actions/walletsActions'
import store from '@/store/store'


const {dispatch, getState} = store

export function del(walletID) {
  const action = () => {
    dispatch(removeWallet(walletID))
    deleteWallet(walletID)
    close()
  }

  const popout = (
    <PopoutAlert title='Удалить счёт?' button={{title: 'Удалить', action}}>
      Кошелёк нельзя будет восстановить.
      <br/>
      Все операции, связанные с этим счётом, останутся.
    </PopoutAlert>
  )
  dispatch(setPopout(popout))
}

export function save(wallet) {
  const colors = getState().colors

  const isEdit = !!wallet.id
  const newWallet = {
    ...wallet,
    icon: wallet.icon || null,
    title: (wallet.title && wallet.title.trim()) || DEFAULT_TITLE,
    balance: stringToNumber(wallet.balance),
    styles: wallet.styles || colors[0]
  }

  if (!isEdit) dispatch(setPageOptions(PAGES.WALLETS, {initialSlide: 1}))
  dispatch(saveWallet(newWallet))
  saveWal(newWallet)
  close(!isEdit)
}

export function getTitle(isEdit) {
  return isEdit ? 'Счёт' : 'Новый счёт'
}

function close(isNew = false) {
  if (isNew) {
    const slides = getState().wallets.length
    dispatch(setPageOptions(PAGES.WALLETS, {initialSlide: slides + 1}))
  }
  dispatch(prevPage())
}
