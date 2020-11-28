import {MAX_LENGTH_TITLE_CATEGORY, PAGES} from '@/constants/constants'
import {clearPageOptions, setPageOptions} from '@/store/actions/pagesActions'
import {nextPage, prevPage, setTimeBack} from '@/store/actions/appActions'
import store from '@/store/store'


const {dispatch, getState} = store

export function openModalIcons() {
  const category = getState().pages[PAGES.CATEGORY].category

  dispatch(clearPageOptions(PAGES.MODAL_ICONS))

  const onClick = icon => {
    dispatch(setPageOptions(PAGES.CATEGORY, {category: {...category, icon}}))
    dispatch(prevPage())
  }
  dispatch(setPageOptions(PAGES.MODAL_ICONS, {
    icon: category.icon,
    emptyIcon: false,
    onClick
  }))

  dispatch(nextPage({modal: PAGES.MODAL_ICONS}))
  dispatch(setTimeBack(Date.now()))
}

export function changeTitle(title) {
  const category = getState().pages[PAGES.CATEGORY].category
  const options = {category: {
    ...category,
    title: title.slice(0, MAX_LENGTH_TITLE_CATEGORY)
  }}
  dispatch(setPageOptions(PAGES.CATEGORY, options))
}
