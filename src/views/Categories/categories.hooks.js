import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {PAGES, TYPES_CATEGORY as TC} from '@/constants/constants'
import {sortCategories} from './categories.functions'


export function useCategories(tab, sort = false) {
  const categories = useSelector(({categories}) => categories)
  return useMemo(() => {
    const result = tab === TC.EXPENSE
      ? categories[TC.EXPENSE]
      : categories[TC.INCOME]
    return sort ? sortCategories(result) : result
  }, [tab, categories])
}

export function useTab() {
  return useSelector(({pages}) => pages[PAGES.CATEGORIES].tab)
}
