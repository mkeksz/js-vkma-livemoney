import React from 'react'
import PropTypes from 'prop-types'
import classes from './Bullets.module.sass'


export const Bullets = ({num, max = 2}) => (
  <div className={classes.Bullets}>
    {max !== 0 && <span className={(num === 0 && classes.active) || ''}/>}
    {max <= 1 ? null : (
      <span className={(num !== 0 && num < max && classes.active) || ''}/>
    )}
    <span className={((num === max || num < 0) && classes.active) || ''}/>
  </div>
)

Bullets.propTypes = {
  num: PropTypes.number.isRequired,
  max: PropTypes.number
}
