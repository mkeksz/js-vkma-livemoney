import React from 'react'
import {PAGES} from '@/constants/constants'
import {DEFAULT_TITLE} from '@/views/Wallet/wallet.constants'
import {PopoutAlert} from '@/components/UI/PopoutAlert/PopoutAlert'
import {setPageOptions} from '@/store/actions/pagesActions'
import {hideLoader, prevPage, setPopout, showLoader
} from '@/store/actions/appActions'
import {deleteWallet, saveWallet} from '@/stateManager'
import {stringToNumber} from '@/core/utils/number'
import {getLast} from '@/core/utils/array'
import store from '@/store/store'


const {dispatch, getState} = store

export function del(walletID) {
  const action = () => {
    dispatch(showLoader())
    deleteWallet(walletID).then(close)
  }

  const popout = (
    <PopoutAlert title='Удалить счёт?' button={{title: 'Удалить', action}}>
      Кошелёк нельзя будет восстановить.
      <br/>
      Все операции связанные с кошельком останутся.
    </PopoutAlert>
  )
  dispatch(setPopout(popout))
}

export function save(wallet) {
  dispatch(showLoader())
  const colors = getState().colors

  const isEdit = !!wallet.id
  const newWallet = {
    ...wallet,
    icon: wallet.icon || null,
    title: wallet.title || DEFAULT_TITLE,
    balance: stringToNumber(wallet.balance),
    styles: wallet.styles || colors[0]
  }

  if (!isEdit) dispatch(setPageOptions(PAGES.WALLETS, {initialSlide: 1}))
  saveWallet(newWallet).then(close)
}

export function getTitle(isEdit) {
  return isEdit ? 'Редактирование счёта' : 'Создание счёта'
}

function close() {
  const lastPage = getLast(getState().app.history)
  store.dispatch(hideLoader())
  if (lastPage.view === PAGES.WALLET) store.dispatch(prevPage())
}
