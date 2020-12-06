import {SET_TOOLTIP} from '../types'

export function setTooltip(name, value) {
  return {type: SET_TOOLTIP, payload: {name, value}}
}
