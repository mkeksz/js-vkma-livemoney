import {useMemo} from 'react'


export function useAmounts(amounts) {
  console.log(amounts)
  return useMemo(() => {
    let total = 0
    const expense = amounts.expense.reduce((acc, analytic) => {
      acc += analytic.amount
      total += analytic.amount
      return acc
    }, 0)
    const income = amounts.income.reduce((acc, analytic) => {
      acc += analytic.amount
      total += analytic.amount
      return acc
    }, 0)

    return {expense, income, total}
  }, [amounts])
}
