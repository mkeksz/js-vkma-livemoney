import {
  BACK_HISTORY,
  HIDE_LOADER,
  PUSH_HISTORY, SET_FAIL_CONNECT, SET_INITIALIZATION, SET_INTRO, SET_POPOUT,
  SET_SNACKBAR, SET_TIMEBACK,
  SET_TIMEZONE,
  SHOW_LOADER
} from '../types'


export function showLoader() {
  return {type: SHOW_LOADER}
}
export function hideLoader() {
  return {type: HIDE_LOADER}
}
export function nextPage({view = null, epic = null, modal = null, popout = null
}) {
  return {type: PUSH_HISTORY, payload: {view, epic, modal, popout}}
}
export function prevPage() {
  return {type: BACK_HISTORY}
}
export function setTimezone(timezone) {
  return {type: SET_TIMEZONE, payload: timezone}
}
export function setSnackbar(snackbar) {
  return {type: SET_SNACKBAR, payload: snackbar}
}
export function setPopout(popout) {
  return {type: SET_POPOUT, payload: popout}
}
export function setInitialization(bool) {
  return {type: SET_INITIALIZATION, payload: bool}
}
export function setIntro(bool) {
  return {type: SET_INTRO, payload: bool}
}
export function setFailConnect(bool) {
  return {type: SET_FAIL_CONNECT, payload: bool}
}
export function setTimeBack(time) {
  return {type: SET_TIMEBACK, payload: time}
}
