import {
  BACK_HISTORY,
  HIDE_LOADER,
  PUSH_HISTORY,
  SET_PLATFORM,
  SHOW_LOADER
} from '../types'

export function showLoader() {
  return {type: SHOW_LOADER}
}
export function hideLoader() {
  return {type: HIDE_LOADER}
}
export function nextPage(view, epic = null) {
  return {type: PUSH_HISTORY, payload: {view, epic}}
}
export function prevPage() {
  return {type: BACK_HISTORY}
}
export function setPlatform(platform) {
  return {type: SET_PLATFORM, payload: platform}
}
