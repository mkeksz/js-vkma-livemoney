import {PAGES} from '@/constants/constants'
import {setPageOptions} from '@/store/actions/pagesActions'
import store from '@/store/store'


const {dispatch} = store

export function clickTab(tab) {
  dispatch(setPageOptions(PAGES.CATEGORIES, {tab}))
}
