import {FONT_AWESOME} from '@/constants/icons/types'
import {IconFontAwesome} from '@/components/UI/Icon/IconFontAwesome'
import React from 'react'


export function getIconByType(icon) {
  switch (icon.type) {
    case FONT_AWESOME: return <IconFontAwesome name={icon.name}/>
    default: return <div>icon</div>
  }
}
