import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Gallery, Header, Link} from '@vkontakte/vkui'
import {PAGES} from '@/constants/constants'
import {getBudgets, openCategories} from './analyticsBudget.functions'
import {GroupBudget} from './GroupBudget/GroupBudget'
import {setPageOptions} from '@/store/actions/pagesActions'
import {Bullets} from '@/components/UI/Bullets/Bullets'
import {useSlide} from '../analytics.hooks'


export const AnalyticsBudget = () => {
  const dispatch = useDispatch()

  const analytics = useSelector(({analytics}) => analytics)
  const budgets = useSelector(({categories}) => getBudgets(categories.expense))

  const countSlides = analytics.length
  const slide = useSlide(countSlides)

  const onChange = index => dispatch(setPageOptions(PAGES.ANALYTICS, {
    slideBudget: index
  }))
  const onClickSettings = () => openCategories()

  return budgets.length > 0 && (
    <div style={{marginBottom: 40}}>
      <Header aside={<Link onClick={onClickSettings}>Настроить</Link>}>
        Бюджеты
      </Header>
      <Gallery
        slideWidth="100%"
        initialSlideIndex={slide}
        style={{height: 'unset'}}
        onChange={onChange}
      >
        {analytics.map(analytic => (
          <GroupBudget key={analytic.date} analytic={analytic}/>
        ))}
      </Gallery>
      <Bullets num={slide} max={countSlides - 1}/>
    </div>
  )
}
