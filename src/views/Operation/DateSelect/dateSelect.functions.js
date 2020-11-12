import {setPageOptions} from '@/store/actions/pagesActions'
import {PAGES as P} from '@/constants/constants'
import store from '@/store/store'

const dispatch = store.dispatch

export function click(dayNumber) {
  dispatch(setPageOptions(P.OPERATION, {choosedDate: dayNumber}))
}
