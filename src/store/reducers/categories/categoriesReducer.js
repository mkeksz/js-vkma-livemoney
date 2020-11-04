import {SET_CATEGORIES} from '../../types'

const initialState = {
  expense: [],
  income: []
}

const handlers = {
  [SET_CATEGORIES]: (_, {payload}) => ({...payload}),
  DEFAULT: state => state
}

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
