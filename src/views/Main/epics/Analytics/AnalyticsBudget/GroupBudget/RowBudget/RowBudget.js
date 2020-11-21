import React from 'react'
import PropTypes from 'prop-types'
import {Caption} from '@vkontakte/vkui'
import {getColorCategory} from '@/shared/categories'
import {percentNumOfNum} from '@/core/utils/number'
import {currencyFilter} from '@/filters/numbersFilter'
import {click} from './rowBudget.functions'
import classes from './RowBudget.module.sass'


export const RowBudget = ({category, maxBudget}) => {
  const color = getColorCategory(category)

  let percentAmount = percentNumOfNum(category.amount, category.budget)
  if (percentAmount < 1 && percentAmount !== 0) percentAmount = 1
  const widthA = (percentAmount > 100 ? 100 : percentAmount) + '%'

  let percentBudget = percentNumOfNum(category.budget, maxBudget)
  if (percentBudget < 5) percentBudget = 5
  const widthB = (percentBudget > 100 ? 100 : percentBudget) + '%'

  const cls = [classes.RowBudget]
  if (color === 'red') cls.push(classes.RowBudget_red)
  else if (color === 'orange') cls.push(classes.RowBudget_orange)
  else if (color === 'green') cls.push(classes.RowBudget_green)
  if (category.disabled) cls.push(classes.RowBudget_disabled)

  const onClick = () => category.disabled ? null : click(category)

  return (
    <div className={cls.join(' ')} onClick={onClick}>
      <div>
        <div className={classes.title}>
          <span>{category.title}</span>
        </div>
        <div className={classes.amount}>
          <Caption level={1}>{currencyFilter(category.amount)}</Caption>
          <Caption level={2} className={classes.amount__max}>
            {currencyFilter(category.budget)}
          </Caption>
        </div>
        <div className={classes.background} style={{width: widthB}}>
          <div><div style={{width: widthA}}/></div>
        </div>
      </div>
    </div>
  )
}

RowBudget.propTypes = {
  category: PropTypes.object.isRequired,
  maxBudget: PropTypes.number.isRequired
}
