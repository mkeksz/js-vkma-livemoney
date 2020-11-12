import React from 'react'
import PropTypes from 'prop-types'
import {useStringDate} from './headerDate.hooks'
import classes from './HeaderDate.module.sass'


export const HeaderDate = ({date}) => {
  const title = useStringDate(date)
  return <div className={classes.HeaderDate}><span>{title}</span></div>
}

HeaderDate.propTypes = {
  date: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
}
