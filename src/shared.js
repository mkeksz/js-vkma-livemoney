import {percentNumOfNum} from './core/utils'

export function getColorCategory(amount, budget) {
  const percentAmount = percentNumOfNum(amount, budget)

  if (percentAmount > 90) return 'red'
  else if (percentAmount > 50) return 'orange'
  else return 'green'
}

export function addAmountToCategories(categories) {
  return categories
}

export function scrollToAnchor(refAnchor) {
  const options = {behavior: 'smooth', block: 'start'}
  refAnchor.current.scrollIntoView(options)
}
