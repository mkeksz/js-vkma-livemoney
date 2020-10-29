import {SET_USER} from '../../types'

const initialState = {
  id: null,
  premium: {
    isActive: false,
    expiryDate: null
  }
}

const handlers = {
  [SET_USER]: (_, action) => ({...action.payload}),
  DEFAULT: state => state
}

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
