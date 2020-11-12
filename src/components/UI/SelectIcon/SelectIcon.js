import React from 'react'
import PropTypes from 'prop-types'
import {Icon} from '../Icon/Icon'
import classes from './SelectIcon.module.sass'


export const SelectIcon = ({color = '#fff', icon, onClick}) => {
  return (
    <div className={classes.SelectIcon} onClick={onClick}>
      <div className={classes.border} style={{borderColor: color}}/>
      <div className={classes.item} style={{color}}>
        {icon && <Icon icon={icon}/>}
      </div>
    </div>
  )
}

SelectIcon.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.object,
  onClick: PropTypes.func.isRequired
}
