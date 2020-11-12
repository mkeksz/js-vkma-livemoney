import {SET_OPERATIONS} from '../../types'
import getReducer from '@/store/getReducer'

const initialState = []

const handlers = {
  [SET_OPERATIONS]: (_, {payload}) => ([...payload]),
  DEFAULT: state => state
}

export default getReducer(initialState, handlers)
