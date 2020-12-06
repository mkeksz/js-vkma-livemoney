import {SET_TOOLTIP} from '../../types'
import getReducer from '@/store/getReducer'

const initialState = {
  wallets: false,
  editWallet: false,
  analytics: false,
  operation: false
}

const handlers = {
  [SET_TOOLTIP]: (state, {payload}) => ({
    ...state,
    [payload.name]: payload.value
  }),
  DEFAULT: state => state
}

export default getReducer(initialState, handlers)
