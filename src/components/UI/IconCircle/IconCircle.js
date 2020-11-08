import React from 'react'
import PropTypes from 'prop-types'
import {Icon} from '../Icon/Icon'
import classes from './IconCircle.module.sass'

export const IconCircle = ({icon, color, type = 'category', styles}) => {
  const cls = [classes.IconCircle]

  if (type === 'new') cls.push(classes.IconCircle_new)
  else if (type === 'wallet') cls.push(classes.IconCircle_wallet)

  if (color === 'red') cls.push(classes.IconCircle_red)
  else if (color === 'orange') cls.push(classes.IconCircle_orange)
  else if (color === 'green') cls.push(classes.IconCircle_green)

  return (
    <div className={cls.join(' ')} style={styles}>
      {icon && <Icon icon={icon}/>}
    </div>
  )
}

IconCircle.propTypes = {
  icon: PropTypes.object,
  color: PropTypes.oneOf(['red', 'orange', 'green']),
  styles: PropTypes.shape({
    color: PropTypes.string,
    backgroundColor: PropTypes.string
  }),
  type: PropTypes.oneOf(['new', 'wallet', 'category'])
}
