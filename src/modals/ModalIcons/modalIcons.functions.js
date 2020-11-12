import store from '@/store/store'
import {PAGES} from '@/constants/constants'


const {getState} = store

export function getStyle(itemIcon = null) {
  const {icon, styles} = getState().pages[PAGES.MODAL_ICONS]

  const selectIcon = icon || {}
  const selectColor = '#3e88dd'
  const boxShadow = 'inset 0 0 0 2px #fff'
  const backgroundColor = styles.backgroundColor

  if (!itemIcon) {
    return {
      backgroundColor,
      borderColor: !selectIcon.id ? selectColor : backgroundColor,
      boxShadow: !selectIcon.id ? boxShadow : null
    }
  }

  return {
    ...styles,
    borderColor: selectIcon.id === itemIcon.id ? selectColor : backgroundColor,
    boxShadow: selectIcon.id === itemIcon.id ? boxShadow : null
  }
}
