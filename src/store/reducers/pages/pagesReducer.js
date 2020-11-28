import {CLEAR_PAGE_OPTIONS, SET_PAGE_OPTIONS} from '@/store/types'
import {ICONS, PAGES, TYPES_CATEGORY} from '@/constants/constants'
import getReducer from '@/store/getReducer'

const initialState = {
  [PAGES.WALLETS]: {
    initialSlide: 1
  },
  [PAGES.WALLET]: {
    wallet: {inTotal: true}
  },
  [PAGES.MODAL_ICONS]: {
    icon: null,
    styles: {color: '#fff', backgroundColor: 'var(--icon_secondary)'},
    onClick: null
  },
  [PAGES.CATEGORIES]: {
    tab: TYPES_CATEGORY.EXPENSE,
    date: null
  },
  [PAGES.CATEGORY]: {
    category: {
      icon: ICONS.RUBLE_SIGN
    },
    type: TYPES_CATEGORY.EXPENSE
  },
  [PAGES.OPERATION]: {
    operation: {},
    initOperation: null,
    choosedDate: 7
  },
  [PAGES.ANALYTICS]: {
    slideBudget: null,
    slideTotal: null
  }
}

const handlers = {
  [SET_PAGE_OPTIONS]: (state, {payload}) => {
    return {
      ...state,
      [payload.page]: {...state[payload.page], ...payload.options}
    }
  },
  [CLEAR_PAGE_OPTIONS]: (state, {payload}) => {
    return {...state, [payload]: initialState[payload]}
  },
  DEFAULT: state => state
}

export default getReducer(initialState, handlers)
