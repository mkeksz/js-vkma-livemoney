import React from 'react'
import PropTypes from 'prop-types'
import {TYPES_CATEGORY} from '@/constants/constants'
import {RowTotal} from './RowTotal/RowTotal'
import {useAmounts} from './groupTotal.hooks'


export const GroupTotal = ({analytic}) => {
  const {expense, income, total} = useAmounts(analytic.amounts)

  return (
    <div>
      <RowTotal type={TYPES_CATEGORY.EXPENSE} amount={expense} total={total}/>
      <RowTotal type={TYPES_CATEGORY.INCOME} amount={income} total={total}/>
    </div>
  )
}

GroupTotal.propTypes = {
  analytic: PropTypes.object.isRequired
}
