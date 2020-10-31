import {
  BACK_HISTORY,
  HIDE_LOADER,
  PUSH_HISTORY,
  SET_PLATFORM,
  SHOW_LOADER
} from '../../types'
import {backToHistory, pushToHistory} from './history'

const initialState = {
  loading: true,
  history: [{view: 'main', epic: 'wallets'}],
  platform: null
}

const handlers = {
  [SHOW_LOADER]: state => ({...state, loading: true}),
  [HIDE_LOADER]: state => ({...state, loading: false}),
  [PUSH_HISTORY]: (state, action) => pushToHistory(state, action.payload),
  [BACK_HISTORY]: state => backToHistory(state),
  [SET_PLATFORM]: (state, action) => ({...state, platform: action}),
  DEFAULT: state => state
}

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
