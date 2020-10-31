import {CLEAR_PAGE_OPTIONS, SET_PAGE_OPTIONS} from '../types'

export function setPageOptions(page, options = {}) {
  return {type: SET_PAGE_OPTIONS, payload: {page, options}}
}

export function clearPageOptions(page) {
  return {type: CLEAR_PAGE_OPTIONS, payload: page}
}
