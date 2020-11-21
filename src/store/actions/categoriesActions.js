import {REMOVE_CATEGORY, SAVE_CATEGORY, SET_CATEGORIES} from '../types'

export function setCategories(categories) {
  return {type: SET_CATEGORIES, payload: categories}
}
export function removeCategory(categoryID) {
  return {type: REMOVE_CATEGORY, payload: categoryID}
}
export function saveCategory(category) {
  return {type: SAVE_CATEGORY, payload: category}
}
