import {SET_WALLETS} from '../../types'
import getReducer from '@/store/getReducer'

const initialState = []

const handlers = {
  [SET_WALLETS]: (_, {payload}) => ([...payload]),
  DEFAULT: state => state
}

export default getReducer(initialState, handlers)
