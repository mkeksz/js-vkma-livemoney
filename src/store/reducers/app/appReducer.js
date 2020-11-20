import {
  BACK_HISTORY,
  HIDE_LOADER,
  PUSH_HISTORY,
  SET_INITIALIZATION,
  SET_POPOUT,
  SET_SNACKBAR,
  SET_TIMEZONE,
  SHOW_LOADER
} from '../../types'
import getReducer from '@/store/getReducer'
import {backToHistory, pushToHistory} from './history'
import storage from '@/core/utils/storage'


const showedIntro = storage('intro')
if (!showedIntro) storage('intro', true)

const initialHistory = !showedIntro
  ? [{view: 'intro', epic: null, modal: null}]
  : [{view: 'main', epic: 'wallets', modal: null}]

const initialState = {
  loading: true,
  initialization: true,
  history: initialHistory,
  popout: null,
  timezone: 0,
  snackbar: null
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
  DEFAULT: state => state
}

export default getReducer(initialState, handlers)
