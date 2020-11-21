import {REMOVE_WALLET, SAVE_WALLET, SET_WALLETS} from '../../types'
import getReducer from '@/store/getReducer'
import {removeWallet, saveWallet} from './wallets.functions'


const initialState = []

const handlers = {
  [SET_WALLETS]: (_, {payload}) => [...payload],
  [REMOVE_WALLET]: (state, {payload}) => removeWallet(state, payload),
  [SAVE_WALLET]: (state, {payload}) => saveWallet(state, payload),
  DEFAULT: state => state
}

export default getReducer(initialState, handlers)
