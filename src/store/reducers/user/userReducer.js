import {SET_USER} from '../../types'
import getReducer from '@/store/getReducer'

const initialState = {}

const handlers = {
  [SET_USER]: (_, action) => ({...action.payload}),
  DEFAULT: state => state
}

export default getReducer(initialState, handlers)
