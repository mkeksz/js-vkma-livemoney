import {
  BACK_HISTORY,
  HIDE_LOADER,
  PUSH_HISTORY,
  SET_PLATFORM, SET_TIMEZONE,
  SHOW_LOADER
} from '../../types'
import {backToHistory, pushToHistory} from './history'

const initialState = {
  loading: true,
  history: [{view: 'main', epic: 'wallets', modal: null, popout: null}],
  platform: null,
  timezone: 0
}

const handlers = {
  [SHOW_LOADER]: state => ({...state, loading: true}),
  [HIDE_LOADER]: state => ({...state, loading: false}),
  [PUSH_HISTORY]: (state, {payload}) => pushToHistory(state, payload),
  [BACK_HISTORY]: state => backToHistory(state),
  [SET_PLATFORM]: (state, {payload}) => ({...state, platform: payload}),
  [SET_TIMEZONE]: (state, {payload}) => ({...state, timezone: payload}),
  DEFAULT: state => state
}

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
