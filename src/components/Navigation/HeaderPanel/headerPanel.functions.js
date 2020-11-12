import {nextPage, prevPage} from '@/store/actions/appActions'
import {PAGES} from '@/constants/constants'
import store from '@/store/store'


const {dispatch} = store

export function click(back) {
  if (back) dispatch(prevPage())
  else dispatch(nextPage({view: PAGES.SETTINGS}))
}
