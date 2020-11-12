import React from 'react'
import {MAX_WALLETS, PAGES} from '@/constants/constants'
import {clearPageOptions} from '@/store/actions/pagesActions'
import {nextPage} from '@/store/actions/appActions'
import {PopoutWarn} from '@/components/UI/PopoutWarn/PopoutWarn'
import store from '@/store/store'


const {dispatch, getState} = store

export function clickNew() {
  const wallets = getState().wallets
  if (wallets.length >= MAX_WALLETS) {
    dispatch(nextPage({popout: (
      <PopoutWarn text={`Максимум активных счетов: ` + MAX_WALLETS}/>
    )}))
    return
  }

  dispatch(clearPageOptions(PAGES.WALLET))
  dispatch(nextPage({view: PAGES.WALLET}))
}
