import React from 'react'
import {ERRORS, PAGES} from '@/constants/constants'
import {DEFAULT_TITLE} from '@/views/Wallet/wallet.constants'
import {PopoutAlert} from '@/components/UI/PopoutAlert/PopoutAlert'
import {setPageOptions} from '@/store/actions/pagesActions'
import {prevPage, setPopout} from '@/store/actions/appActions'
import {deleteWallet, saveWallet as saveWal} from '@/stateManager'
import {stringToNumber} from '@/core/utils/number'
import {removeWallet, saveWallet} from '@/store/actions/walletsActions'
import {getLast} from '@/core/utils/array'
import {getMessageError} from '@/filters/errorFilter'
import {PopoutWarn} from '@/components/UI/PopoutWarn/PopoutWarn'
import store from '@/store/store'


const {dispatch, getState} = store

export function del(walletID, initWallet) {
  const action = () => {
    dispatch(removeWallet(walletID))
    deleteWallet(walletID).catch(() => {
      const msg = getMessageError(ERRORS.FAILED_FETCH)
      dispatch(setPopout(<PopoutWarn text={msg.text} title={msg.title}/>))
      dispatch(saveWallet(initWallet, true))
    })
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

export function save(wallet, initWallet) {
  const colors = getState().colors

  const isEdit = !!wallet.id
  const newWallet = {
    ...wallet,
    icon: wallet.icon || null,
    title: (wallet.title && wallet.title.trim()) || DEFAULT_TITLE,
    balance: stringToNumber(wallet.balance),
    styles: wallet.styles || colors[0],
    disabled: true
  }

  if (!isEdit) dispatch(setPageOptions(PAGES.WALLETS, {initialSlide: 1}))
  dispatch(saveWallet(newWallet))
  saveWal(newWallet).catch(() => {
    const message = getMessageError(ERRORS.FAILED_FETCH)
    dispatch(setPopout(<PopoutWarn text={message.text} title={message.title}/>))
    const lastWallet = getLast(getState().wallets)
    if (initWallet) dispatch(saveWallet({...initWallet, disabled: false}))
    else {
      const slides = getState().wallets.length
      dispatch(removeWallet(lastWallet.id))
      dispatch(setPageOptions(PAGES.WALLETS, {slide: slides}))
    }
  })
  close(!isEdit)
}

export function getTitle(isEdit) {
  return isEdit ? 'Счёт' : 'Новый счёт'
}

function close(isNew = false) {
  if (isNew) {
    const slides = getState().wallets.length
    dispatch(setPageOptions(PAGES.WALLETS, {slide: slides + 1}))
  }
  dispatch(prevPage())
}
