import React from 'react'
import {PAGES} from '@/constants/constants'
import {DEFAULT_COLOR, DEFAULT_TITLE} from '@/views/Wallet/wallet.constants'
import {PopoutAlert} from '@/components/UI/PopoutAlert/PopoutAlert'
import {setPageOptions} from '@/store/actions/pagesActions'
import {hideLoader, nextPage, prevPage, showLoader
} from '@/store/actions/appActions'
import {deleteWallet, saveWallet} from '@/stateManager'
import {stringToNumber} from '@/core/utils/number'
import store from '@/store/store'


const dispatch = store.dispatch

export function del(walletID) {
  const action = () => {
    dispatch(showLoader())
    deleteWallet(walletID).then(close)
  }

  dispatch(nextPage({popout: (
    <PopoutAlert title='Удалить счёт?' button={{title: 'Удалить', action}}>
      Кошелёк нельзя будет восстановить.
      <br/>
      Все операции связанные с кошельком останутся.
    </PopoutAlert>
  )}))
}

export function save(wallet) {
  dispatch(showLoader())

  const isEdit = !!wallet.id
  const newWallet = {
    ...wallet,
    icon: wallet.icon || null,
    title: wallet.title || DEFAULT_TITLE,
    balance: stringToNumber(wallet.balance),
    styles: wallet.styles || DEFAULT_COLOR
  }
  if (!isEdit) dispatch(setPageOptions(PAGES.WALLETS, {initialSlide: 1}))

  saveWallet(newWallet).then(close)
}

export function getTitle(isEdit) {
  return isEdit ? 'Редактирование счёта' : 'Создание счёта'
}

function close() {
  store.dispatch(hideLoader())
  store.dispatch(prevPage())
}
