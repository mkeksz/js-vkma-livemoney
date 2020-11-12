import {SET_CATEGORIES} from '../../types'
import {TYPES_CATEGORY} from '@/constants/constants'

const initialState = {
  [TYPES_CATEGORY.EXPENSE]: [],
  [TYPES_CATEGORY.INCOME]: []
}

const handlers = {
  [SET_CATEGORIES]: (_, {payload}) => ({...payload}),
  DEFAULT: state => state
}

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
