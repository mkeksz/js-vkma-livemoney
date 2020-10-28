import {SET_USER_ID} from '../../types'

const initialState = {
  id: null
}

const handlers = {
  [SET_USER_ID]: (state, action) => ({...state, id: action.payload}),
  DEFAULT: state => state
}

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
