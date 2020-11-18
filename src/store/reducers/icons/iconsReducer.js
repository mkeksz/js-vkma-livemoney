import {SET_ICONS} from '@/store/types'
import getReducer from '@/store/getReducer'

const initialState = []

const handlers = {
  [SET_ICONS]: (_, {payload}) => [...payload],
  DEFAULT: state => state
}

export default getReducer(initialState, handlers)
