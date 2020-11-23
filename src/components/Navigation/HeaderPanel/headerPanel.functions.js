import {nextPage, prevPage} from '@/store/actions/appActions'
import {showWallPostBox} from '@/core/bridge'
import {LINK_APP, PAGES} from '@/constants/constants'
import store from '@/store/store'


const {dispatch} = store

export function click(back) {
  if (back) dispatch(prevPage())
  else dispatch(nextPage({view: PAGES.SETTINGS}))
}

const textShare = `Я контролирую свои расходы в приложении "Мой бюджет".
Рекомендую!

${LINK_APP}`

export function share() {
  showWallPostBox(textShare)
}
