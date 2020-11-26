import {nextPage, prevPage} from '@/store/actions/appActions'
import {showWallPostBox} from '@/core/bridge'
import {LINK_APP, PAGES} from '@/constants/constants'
import store from '@/store/store'
import {getTotalAmounts} from '@/shared/analytics'
import {currencyFilter} from '@/filters/numbersFilter'


const {dispatch} = store

export function click(back) {
  if (back) dispatch(prevPage())
  else dispatch(nextPage({view: PAGES.SETTINGS}))
}


function getTextShare(num) {
  const textNum = `
    Мои доходы превышают расходы на ${currencyFilter(num)}
    
    Такого результата мне добиться помогло Мини-приложение "Мой бюджет"
    Рекомендую!
    
    ${LINK_APP}
  `
  const text = `Мои расходы уменьшились благодаря приложению "Мой бюджет"
  Рекомендую!
  
  ${LINK_APP}`

  return num <= 0 ? text : textNum
}

export function share(amounts) {
  const {expense, income} = getTotalAmounts(amounts)
  const result = income - expense

  showWallPostBox(getTextShare(result))
}
