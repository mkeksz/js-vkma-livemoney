import {
  BACK_HISTORY,
  HIDE_LOADER,
  PUSH_HISTORY,
  SET_PLATFORM, SET_TIMEZONE,
  SHOW_LOADER
} from '../types'

export function showLoader() {
  return {type: SHOW_LOADER}
}
export function hideLoader() {
  return {type: HIDE_LOADER}
}
export function nextPage({
  view = null,
  epic = null,
  modal = null,
  popout = null
}) {
  return {type: PUSH_HISTORY, payload: {view, epic, modal, popout}}
}
export function prevPage() {
  return {type: BACK_HISTORY}
}
export function setPlatform(platform) {
  return {type: SET_PLATFORM, payload: platform}
}
export function setTimezone(timezone) {
  return {type: SET_TIMEZONE, payload: timezone}
}
