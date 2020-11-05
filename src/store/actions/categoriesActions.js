import {SET_CATEGORIES} from '../types'

export function setCategories(categories) {
  return {type: SET_CATEGORIES, payload: categories}
}

