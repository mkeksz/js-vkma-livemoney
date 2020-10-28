import {SET_USER_ID} from '../types'

export function setUserId(id) {
  return {type: SET_USER_ID, payload: id}
}
