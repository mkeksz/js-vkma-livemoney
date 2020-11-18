import {SET_COLORS} from '../types'

export function setColors(colors) {
  return {type: SET_COLORS, payload: colors}
}
