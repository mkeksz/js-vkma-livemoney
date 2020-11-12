import React from 'react'
import {MAX_CATEGORIES, PAGES} from '@/constants/constants'
import {clearPageOptions, setPageOptions} from '@/store/actions/pagesActions'
import {PopoutWarn} from '@/components/UI/PopoutWarn/PopoutWarn'
import {nextPage} from '@/store/actions/appActions'
import store from '@/store/store'


const {dispatch, getState} = store

export function clickNew() {
  const tab = getState().pages[PAGES.CATEGORIES].tab

  const categories = getState().categories[tab]
  if (categories.length >= MAX_CATEGORIES) {
    dispatch(nextPage({popout: (
      <PopoutWarn text={`Максимум категорий: ` + MAX_CATEGORIES}/>
    )}))
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
