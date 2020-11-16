import React from 'react'
import PropTypes from 'prop-types'
import {Div} from '@vkontakte/vkui'
import {currencyFilter} from '@/filters/numbersFilter'
import {useSum} from './GroupInfo.hooks'
import classes from './GroupInfo.module.sass'


export const GroupInfo = ({categories}) => {
  const {total, budget} = useSum(categories)

  return (
    <Div className={classes.GroupInfo}>
      <div className={classes.GroupInfo__total}>
        <div>Всего</div>
        <div>{currencyFilter(total)}</div>
      </div>
      {budget > 0 && (
        <div className={classes.GroupInfo__budget}>
          <div>Бюджет</div>
          <div>{currencyFilter(budget, false)}</div>
        </div>
      )}
    </Div>
  )
}

GroupInfo.propTypes = {
  categories: PropTypes.array
}
