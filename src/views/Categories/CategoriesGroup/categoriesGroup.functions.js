import {PAGES} from '@/constants/constants'
import {setPageOptions} from '@/store/actions/pagesActions'
import {nextPage} from '@/store/actions/appActions'
import store from '@/store/store'


const {dispatch} = store

export function clickCategory(category, tab) {
  dispatch(setPageOptions(PAGES.CATEGORY, {
    category, type: tab,
    initCategory: category
  }))
  dispatch(nextPage({view: PAGES.CATEGORY}))
}
