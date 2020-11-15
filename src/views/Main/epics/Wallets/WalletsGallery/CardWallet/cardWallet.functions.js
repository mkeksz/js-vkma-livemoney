import React from 'react'
import {ERRORS, MAX_WALLETS as MW, PAGES} from '@/constants/constants'
import {clearPageOptions} from '@/store/actions/pagesActions'
import {nextPage, setPopout} from '@/store/actions/appActions'
import {PopoutWarn} from '@/components/UI/PopoutWarn/PopoutWarn'
import {getMessageError} from '@/filters/errorFilter'
import store from '@/store/store'


const {dispatch, getState} = store

export function clickNew() {
  const wallets = getState().wallets
  if (wallets.length >= MW) {
    const message = getMessageError(ERRORS.MAX_WALLETS)
    dispatch(setPopout(<PopoutWarn text={message.text} title={message.title}/>))
    return
  }

  dispatch(clearPageOptions(PAGES.WALLET))
  dispatch(nextPage({view: PAGES.WALLET}))
}
