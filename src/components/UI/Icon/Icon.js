import React from 'react'
import PropTypes from 'prop-types'
import {getIconByType} from './Icon.functions'
import classes from './Icon.module.sass'


export const Icon = ({icon}) => (
  <div className={classes.Icon}>{getIconByType(icon)}</div>
)

Icon.propTypes = {
  icon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  })
}


