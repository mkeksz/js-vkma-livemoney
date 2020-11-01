import React from 'react'
import PropTypes from 'prop-types'
import classes from './CircleColor.module.sass'

export const CircleColor = ({color, onClick, selected = false}) => {
  return (
    <div
      className={classes.CircleColor}
      style={{
        backgroundColor: color.backgroundColor,
        borderColor: selected ? '#3f8ae0' : color.backgroundColor,
        boxShadow: selected ? 'inset 0 0 0 2px #fff' : null
      }}
      onClick={() => onClick(color.id)}
    />
  )
}

CircleColor.propTypes = {
  color: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool
}
