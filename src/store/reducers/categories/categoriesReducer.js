import {SET_CATEGORIES} from '../../types'
import {TYPES_CATEGORY} from '@/constants/constants'
import getReducer from '@/store/getReducer'

const initialState = {
  [TYPES_CATEGORY.EXPENSE]: [],
  [TYPES_CATEGORY.INCOME]: []
}

const handlers = {
  [SET_CATEGORIES]: (_, {payload}) => ({...payload}),
  DEFAULT: state => state
}

export default getReducer(initialState, handlers)
