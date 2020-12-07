import {clearPageOptions, setPageOptions} from '@/store/actions/pagesActions'
import {PAGES, TYPES_OPERATION as TO} from '@/constants/constants'
import {nextPage} from '@/store/actions/appActions'
import store from '@/store/store'


const {dispatch, getState} = store

export function click(type) {
  const indexWallet = getState().pages[PAGES.WALLETS].initialSlide - 2
  const wallet = getState().wallets[indexWallet]

  dispatch(clearPageOptions(PAGES.OPERATION))
  dispatch(setPageOptions(PAGES.OPERATION, {
    operation: {
      type,
      from: type === TO.EXPENSE && !!wallet && {type: 'wallet', id: wallet.id},
      to: type === TO.INCOME && !!wallet && {type: 'wallet', id: wallet.id}
    }
  }))
  setTimeout(() => dispatch(nextPage({view: PAGES.OPERATION})), 0)
}
