import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {PAGES, TYPES_CATEGORY as TC} from '@/constants/constants'
import {mapWithAnalytics, sortCategories} from '@/shared/categories'


export function useCategories(sort = false) {
  const categories = useSelector(({categories}) => categories)
  const {date} = useSelector(({pages}) => pages[PAGES.CATEGORIES])
  const analytics = useSelector(({analytics}) => analytics)
  const tab = useTab()

  return useMemo(() => {
    const result = categories[tab]


    const stringDate = `${new Date().getFullYear()}-${new Date().getMonth()+1}`
    const _date = date || stringDate

    let amountsDate = analytics.find(a => a.date === _date).amounts[tab]
    amountsDate = mapWithAnalytics(result, amountsDate)

    return sort ? sortCategories(amountsDate) : amountsDate
  }, [tab, categories, date])
}

export function useTab() {
  return useSelector(({pages}) => pages[PAGES.CATEGORIES].tab) || TC.EXPENSE
}
