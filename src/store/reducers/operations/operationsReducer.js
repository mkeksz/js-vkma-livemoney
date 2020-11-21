import {REMOVE_OPERATION, SAVE_OPERATION, SET_OPERATIONS} from '../../types'
import getReducer from '@/store/getReducer'
import {removeOperation, saveOperation} from './operations.functions'


const initialState = []

const handlers = {
  [SET_OPERATIONS]: (_, {payload}) => [...payload],
  [REMOVE_OPERATION]: (state, {payload}) => removeOperation(state, payload),
  [SAVE_OPERATION]: (state, {payload}) => saveOperation(state, payload),
  DEFAULT: state => state
}

export default getReducer(initialState, handlers)
