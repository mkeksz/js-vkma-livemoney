import {SET_WALLETS} from '../../types'

const initialState = []

const handlers = {
  [SET_WALLETS]: (_, {payload}) => ([...payload]),
  DEFAULT: state => state
}

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
