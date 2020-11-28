import {BACK_HISTORY, HIDE_LOADER, PUSH_HISTORY, SET_INITIALIZATION, SET_INTRO,
  SET_POPOUT, SET_SNACKBAR, SET_TIMEZONE, SET_TIMEBACK, SHOW_LOADER
} from '../../types'
import getReducer from '@/store/getReducer'
import {backToHistory, pushToHistory} from './history'


const initialState = {
  loading: true,
  initialization: true,
  history: [{view: 'main', epic: 'wallets', modal: null}],
  timeBack: 0,
  popout: null,
  timezone: 0,
  snackbar: null,
  intro: false
}

const handlers = {
  [SHOW_LOADER]: state => ({...state, loading: true}),
  [HIDE_LOADER]: state => ({...state, loading: false}),
  [SET_INITIALIZATION]: (state, {payload}) =>
    ({...state, initialization: payload}),
  [PUSH_HISTORY]: (state, {payload}) => pushToHistory(state, payload),
  [BACK_HISTORY]: state => backToHistory(state),
  [SET_TIMEZONE]: (state, {payload}) => ({...state, timezone: payload}),
  [SET_SNACKBAR]: (state, {payload}) => ({...state, snackbar: payload}),
  [SET_POPOUT]: (state, {payload}) => ({...state, popout: payload}),
  [SET_INTRO]: (state, {payload}) => ({...state, intro: payload}),
  [SET_TIMEBACK]: (state, {payload}) => ({...state, timeBack: payload}),
  DEFAULT: state => state
}

export default getReducer(initialState, handlers)
