import {useMemo} from 'react'
import {TYPES_OPERATION as TP} from '@/constants/constants'

export function useTypes(type) {
  return useMemo(() => {
    const from = type === TP.INCOME || type === TP.TRANSFER ? TP.INCOME : null
    const to = type === TP.EXPENSE ? TP.EXPENSE : null
    return {from, to}
  }, [type])
}
