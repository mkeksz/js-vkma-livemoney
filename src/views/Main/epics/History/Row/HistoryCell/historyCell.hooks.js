import {useMemo} from 'react'
import {getItem} from './historyCell.functions'
import {ICONS as I, TYPES_OPERATION as TO} from '@/constants/constants'
import {currencyFilter} from '@/filters/numbersFilter'


export function useItem(operation, direction) {
  return useMemo(() => getItem(operation.type, operation[direction]),
      [operation[direction], operation.type, direction])
}

export function useIcon(operation) {
  const fromIcon = useItem(operation, 'from').icon
  const toIcon = useItem(operation, 'to').icon

  return useMemo(() => {
    const icon = operation.type === TO.EXPENSE ? toIcon : fromIcon
    if (!icon) return operation.type === TO.TRANSFER ? I.WALLET : I.RUBLE_SIGN
    return icon
  }, [operation.type, fromIcon, toIcon])
}

export function useAmount(operation) {
  return useMemo(() => {
    const type = operation.type
    const symbol = (type === TO.EXPENSE && '-') || (type === TO.INCOME && '+')
    return symbol + currencyFilter(operation.amount)
  }, [operation.type, operation.amount])
}
