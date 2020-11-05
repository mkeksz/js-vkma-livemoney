import {CLEAR_PAGE_OPTIONS, SET_PAGE_OPTIONS} from '../../types'
import {PAGES} from '../../../constants/constants'

const initialState = {
  [PAGES.WALLETS]: {
    initialSlide: 1
  },
  [PAGES.WALLET]: {
    id: null,
    icon: null
  },
  [PAGES.MODAL_ICONS]: {
    icon: null,
    styles: {color: '#fff', backgroundColor: 'var(--icon_secondary)'},
    onClick: null
  },
  [PAGES.CATEGORIES]: {
    selectedTab: 'expense'
  },
  [PAGES.CATEGORY]: {
    id: null,
    icon: null,
    type: 'expense'
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
    return {
      ...state,
      [payload]: initialState[payload]
    }
  },
  DEFAULT: state => state
}

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
