import React from 'react'
import PropTypes from 'prop-types'
import {Group, Header, Subhead} from '@vkontakte/vkui'
import {TYPES_CATEGORY} from '@/constants/constants'
import {currencyFilter} from '@/filters/numbersFilter'
import {percentNumOfNum} from '@/core/utils/number'
import classes from './RowTotal.module.sass'


export const RowTotal = ({type, amount, total}) => {
  const cls = [classes.RowTotal]
  if (type === TYPES_CATEGORY.EXPENSE) cls.push(classes.RowTotal__expense)

  const title = type === TYPES_CATEGORY.EXPENSE ? 'Расходы' : 'Доходы'

  const width = total !== 0 ? percentNumOfNum(amount, total) + '%' : 0

  return (
    <Group
      separator='hide'
      className={cls.join(' ')}
      style={{height: '100%', width: '90%', margin: 'auto'}}
    >
      <Header
        aside={
          <Subhead weight='regular'>{currencyFilter(amount)}</Subhead>
        }
      >
        {title}
      </Header>
      <div className={classes.line}><div style={{width}}/></div>
    </Group>
  )
}

RowTotal.propTypes = {
  type: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}
