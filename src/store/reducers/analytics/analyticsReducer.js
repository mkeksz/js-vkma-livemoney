import {SET_ANALYTICS} from '@/store/types'
import getReducer from '@/store/getReducer'


const initialState = []

const handlers = {
  [SET_ANALYTICS]: (_, {payload}) => payload,
  DEFAULT: state => state
}

export default getReducer(initialState, handlers)
