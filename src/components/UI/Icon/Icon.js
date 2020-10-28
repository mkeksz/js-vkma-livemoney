import React from 'react'
import PropTypes from 'prop-types'
import {FONT_AWESOME} from '../../../constants/icons/types'
import {IconFontAwesome} from './IconFontAwesome'
import classes from './Icon.module.sass'

export const Icon = ({icon}) => {
  return <div className={classes.Icon}>{getIconByType(icon)}</div>
}

Icon.propTypes = {
  icon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  })
}

function getIconByType(icon) {
  switch (icon.type) {
    case FONT_AWESOME: return <IconFontAwesome name={icon.name}/>
    default: return <div>icon</div>
  }
}
