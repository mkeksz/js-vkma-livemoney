import {SET_CATEGORIES} from '../../types'
import getReducer from '@/store/getReducer'

const initialState = []

const handlers = {
  [SET_CATEGORIES]: (_, {payload}) => [...payload],
  DEFAULT: state => state
}

export default getReducer(initialState, handlers)
