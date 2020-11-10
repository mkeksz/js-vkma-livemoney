import React from 'react'
import PropTypes from 'prop-types'
import classes from './HeaderDate.module.sass'
import {compareDates} from '../../../../../core/utils'

export const HeaderDate = ({date}) => {
  date = new Date(date)

  let stringDate = date.toLocaleString(
      'ru',
      {month: 'long', day: 'numeric', weekday: 'short'}
  )

  const todayDate = new Date()
  const yesterdayDate = new Date()
  yesterdayDate.setDate(yesterdayDate.getDate() - 1)

  if (compareDates(date, todayDate)) stringDate = 'Сегодня'
  else if (compareDates(date, yesterdayDate)) stringDate = 'Вчера'

  return (
    <div className={classes.HeaderDate}>
      <span>{stringDate}</span>
    </div>
  )
}

HeaderDate.propTypes = {
  date: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
}
