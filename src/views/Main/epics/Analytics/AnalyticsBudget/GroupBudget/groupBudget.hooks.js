import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {TYPES_CATEGORY as TC} from '@/constants/constants'
import {mapWithAnalytics} from '@/shared/categories'
import {getBudgets} from '../analyticsBudget.functions'


const MAX_CATEGORIES_IN_PAGE = 7

export function useCategories(amounts) {
  const categories = useSelector(({categories}) => categories)

  return useMemo(() => {
    const _categories = categories.filter(c => c.type === TC.EXPENSE)
    const allCategories = mapWithAnalytics(_categories, amounts)

    const allBudgets = getBudgets(allCategories)
        .sort((a, b) => b.budget - a.budget)

    const monthBudgets = allBudgets
        .slice(0, MAX_CATEGORIES_IN_PAGE)

    const otherBudgets = allCategories
        .filter(c => !monthBudgets.find(b => b.id === c.id))

    const otherAmount = otherBudgets
        .reduce((acc, b) => {
          acc += (b && b.amount) || 0
          return acc
        }, 0)

    return [monthBudgets, otherAmount]
  }, [categories])
}

export function useExpenseAnalytic(analytic) {
  return useMemo(() => {
    return analytic.amounts.filter(a => a.type === TC.EXPENSE)
  }, [analytic])
}

export function useDateHeader(date) {
  return useMemo(() => {
    const _date = new Date(date)
    const options = {month: 'long'}
    return `${_date.toLocaleDateString('ru', options)} ${_date.getFullYear()}`
  }, [date])
}
