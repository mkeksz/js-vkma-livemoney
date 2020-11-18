import {SET_COLORS} from '@/store/types'
import getReducer from '@/store/getReducer'

const initialState = []

const handlers = {
  [SET_COLORS]: (_, {payload}) => [...payload],
  DEFAULT: state => state
}

export default getReducer(initialState, handlers)
