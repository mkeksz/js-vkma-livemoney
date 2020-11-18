import {SET_ICONS} from '../types'

export function setIcons(icons) {
  return {type: SET_ICONS, payload: icons}
}
