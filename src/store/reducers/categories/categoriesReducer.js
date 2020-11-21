import {REMOVE_CATEGORY, SAVE_CATEGORY, SET_CATEGORIES} from '../../types'
import getReducer from '@/store/getReducer'
import {removeCategory, saveCategory} from './categories.functions'


const initialState = []

const handlers = {
  [SET_CATEGORIES]: (_, {payload}) => [...payload],
  [REMOVE_CATEGORY]: (state, {payload}) => removeCategory(state, payload),
  [SAVE_CATEGORY]: (state, {payload}) => saveCategory(state, payload),
  DEFAULT: state => state
}

export default getReducer(initialState, handlers)
