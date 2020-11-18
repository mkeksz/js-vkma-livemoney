import {percentNumOfNum} from '@/core/utils/number'
import {getLast} from '@/core/utils/array'


export function getColorCategory(category) {
  if (!category || !category.budget) return null
  const percentAmount = percentNumOfNum(category.amount, category.budget)

  if (percentAmount > 90) return 'red'
  else if (percentAmount > 50) return 'orange'
  else return 'green'
}

export function addAmountToCategories(categories, analytics) {
  const dateAmounts = getLast(analytics).amounts
  return mapWithAnalytics(categories, dateAmounts)
}

export function sortCategories(categories) {
  return categories.sort((a, b) => {
    if ((a.amount || b.amount) && a.amount !== b.amount) {
      return (b.amount || 0) - (a.amount || 0)
    }
    return b.budget - a.budget
  })
}

export function mapWithAnalytics(categories, analyticAmounts) {
  return categories.map(cat => {
    const amountCat = analyticAmounts.find(a => a.id === cat.id)
    const amount = (amountCat && amountCat.amount) || 0
    return {...cat, amount}
  })
}
