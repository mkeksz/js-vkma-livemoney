import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Gallery, Header, Link, Tooltip} from '@vkontakte/vkui'
import {PAGES} from '@/constants/constants'
import {getBudgets, openCategories} from './analyticsBudget.functions'
import {GroupBudget} from './GroupBudget/GroupBudget'
import {setPageOptions} from '@/store/actions/pagesActions'
import {Bullets} from '@/components/UI/Bullets/Bullets'
import {useSlideBudget, useTooltips} from './analyticsBudget.hooks'


export const AnalyticsBudget = () => {
  const dispatch = useDispatch()

  const analytics = useSelector(({analytics}) => analytics)
  const budgets = useSelector(({categories}) => getBudgets(categories))
  const tooltips = useTooltips()

  const countSlides = analytics.length
  const slide = useSlideBudget(countSlides)

  const onChange = index => dispatch(setPageOptions(PAGES.ANALYTICS, {
    slideBudget: index
  }))
  const onClickSettings = () => openCategories()

  return budgets.length > 0 && (
    <div style={{marginBottom: 40}}>
      <Header
        style={{userSelect: 'none'}}
        aside={
          <Tooltip
            text='Добавь новые категории и измени их бюджет под себя'
            isShown={tooltips.settings.show}
            onClose={tooltips.settings.on}
            alignX='right'
          >
            <Link onClick={onClickSettings}>Настроить</Link>
          </Tooltip>
        }
      >
        Бюджеты
      </Header>
      <Tooltip
        header='Ежемесячный бюджет'
        text='Здесь показано сколько ты можешь ещё потратить в этом месяце'
        isShown={tooltips.start.show}
        onClose={tooltips.start.on}
        offsetY={100}
        offsetX={10}
      >
        <div/>
      </Tooltip>
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
