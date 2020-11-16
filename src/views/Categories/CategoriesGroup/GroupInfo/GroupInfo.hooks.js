import {useMemo} from 'react'

export function useSum(categories) {
  return useMemo(() => {
    return categories.reduce((acc, category) => {
      acc.total += category.amount || 0
      acc.budget += category.budget || 0
      return acc
    }, {total: 0, budget: 0})
  }, [categories])
}
