import React from 'react'
import {ERRORS, MAX_CATEGORIES as MW, PAGES} from '@/constants/constants'
import {clearPageOptions, setPageOptions} from '@/store/actions/pagesActions'
import {PopoutWarn} from '@/components/UI/PopoutWarn/PopoutWarn'
import {nextPage, setPopout} from '@/store/actions/appActions'
import store from '@/store/store'
import {getMessageError} from '@/filters/errorFilter'


const {dispatch, getState} = store

export function clickNew() {
  const tab = getState().pages[PAGES.CATEGORIES].tab

  const categories = getState().categories[tab]
  if (categories.length >= MW) {
    const message = getMessageError(ERRORS.MAX_CATEGORIES)
    dispatch(setPopout(<PopoutWarn text={message.text} title={message.title}/>))
    return
  }

  dispatch(clearPageOptions(PAGES.CATEGORY))
  dispatch(setPageOptions(PAGES.CATEGORY, {type: tab}))
  dispatch(nextPage({view: PAGES.CATEGORY}))
}

export function sortCategories(categories) {
  return categories.sort((a, b) => {
    if (a.amount || b.amount) return (b.amount || 0) - (a.amount || 0)
    return b.budget - a.budget
  })
}
