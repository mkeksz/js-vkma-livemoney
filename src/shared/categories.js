import {percentNumOfNum} from '@/core/utils/number'
import {compareDates} from '@/core/utils/date'
import {TYPES_CATEGORY as TC} from '@/constants/constants'


export function getColorCategory(category) {
  if (!category || !category.budget) return null
  const percentAmount = percentNumOfNum(category.amount, category.budget)

  if (percentAmount > 90) return 'red'
  else if (percentAmount > 50) return 'orange'
  else return 'green'
}

export function addAmountToCategories(categories, operations) {
  const categs = {...categories}

  const addAmount = key => {
    categs[key] = categs[key].map(category => ({...category, amount: 0}))
  }
  const setAmount = (key, op) => {
    if (op[key].type !== 'category') return

    const nameOp = key === 'to' ? TC.EXPENSE : TC.INCOME

    const index = categs[nameOp].findIndex(cat => cat.id === op[key].itemID)
    if (index === -1) return

    categs[nameOp][index].amount += op.amount
  }

  Object.keys(categs).forEach(addAmount)

  operations.forEach(operation => {
    if (!compareDates(operation.date, new Date(), true)) return
    Object.keys(operation).forEach(key => setAmount(key, operation))
  })

  return categs
}
