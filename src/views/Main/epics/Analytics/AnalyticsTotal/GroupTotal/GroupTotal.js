import React from 'react'
import PropTypes from 'prop-types'
import {Header, Group} from '@vkontakte/vkui'
import {TYPES_CATEGORY} from '@/constants/constants'
import {RowTotal} from './RowTotal/RowTotal'
import {useAmounts, useDateHeader} from './groupTotal.hooks'


export const GroupTotal = ({analytic}) => {
  const {expense, income, total} = useAmounts(analytic.amounts)
  const dateHeader = useDateHeader(analytic.date)

  return (
    <div>
      <Group
        style={{height: '100%', width: '90%', margin: 'auto'}}
        header={
          <Header mode="secondary" style={{padding: 0}}>{dateHeader}</Header>
        }
        separator='hide'
      />
      <RowTotal type={TYPES_CATEGORY.EXPENSE} amount={expense} total={total}/>
      <RowTotal type={TYPES_CATEGORY.INCOME} amount={income} total={total}/>
    </div>
  )
}

GroupTotal.propTypes = {
  analytic: PropTypes.object.isRequired
}
