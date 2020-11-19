import {useMemo} from 'react'
import {TYPES_CATEGORY} from '@/constants/constants'


export function useAmounts(amounts) {
  return useMemo(() => {
    const expenseAmount = amounts.filter(a => a.type === TYPES_CATEGORY.EXPENSE)
    const incomeAmount = amounts.filter(a => a.type === TYPES_CATEGORY.INCOME)

    let total = 0
    const expense = expenseAmount.reduce((acc, analytic) => {
      acc += analytic.amount
      total += analytic.amount
      return acc
    }, 0)
    const income = incomeAmount.reduce((acc, analytic) => {
      acc += analytic.amount
      total += analytic.amount
      return acc
    }, 0)

    return {expense, income, total}
  }, [amounts])
}

export function useDateHeader(date) {
  return useMemo(() => {
    const _date = new Date(date)
    _date.setUTCMonth(_date.getUTCMonth() + 1)
    const options = {month: 'long'}
    return `${_date.toLocaleDateString('ru', options)} ${_date.getFullYear()}`
  }, [date])
}
