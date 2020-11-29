import React from 'react'
import PropTypes from 'prop-types'
import {Caption, Group, Header, Link} from '@vkontakte/vkui'
import {Icon16Chevron} from '@vkontakte/icons'
import {RowBudget} from './RowBudget/RowBudget'
import {currencyFilter} from '@/filters/numbersFilter'
import {useCategories, useDateHeader, useExpenseAnalytic
} from './groupBudget.hooks'
import {openCategories} from '../analyticsBudget.functions'
import classes from './GroupBudget.module.sass'


export const GroupBudget = ({analytic}) => {
  const expenseAnalytic = useExpenseAnalytic(analytic)
  const [monthBudgets, otherAmount] = useCategories(expenseAnalytic)
  const dateHeader = useDateHeader(analytic.date)

  const maxBudget = +(monthBudgets > 0 && monthBudgets[0].budget)

  const onClickOther = () => openCategories(analytic.date)

  return (
    <div>
      <Group
        style={{height: '100%', width: '90%', margin: 'auto'}}
        header={
          <Header mode="secondary" style={{padding: 0, userSelect: 'none'}}>
            {dateHeader}
          </Header>
        }
      >
        {monthBudgets.map(cat => (
          <RowBudget key={cat.id} category={cat} maxBudget={maxBudget}/>
        ))}
        {!!otherAmount && (
          <Header
            mode='secondary'
            aside={
              <Caption
                level={1}
                style={{userSelect: 'none'}}
                className={classes.amountOther}
              >
                {currencyFilter(otherAmount)}
              </Caption>
            }
          >
            <Link
              style={{userSelect: 'none'}}
              className={classes.linkOther}
              onClick={onClickOther}
            >
              Другое <Icon16Chevron width={18} height={18}/>
            </Link>
          </Header>
        )}
      </Group>
    </div>
  )
}

GroupBudget.propTypes = {
  analytic: PropTypes.object.isRequired
}
