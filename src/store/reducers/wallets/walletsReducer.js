import {SET_WALLETS} from '../../types'

const initialState = {
  activeWallets: [],
  inactiveWallets: [],
  maxActiveWallets: 5
}

const handlers = {
  [SET_WALLETS]: (_, action) => ({...action.payload}),
  DEFAULT: state => state
}

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
