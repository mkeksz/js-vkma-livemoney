import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Gallery} from '@vkontakte/vkui'
import {PAGES} from '@/constants/constants'
import {Bullets} from '@/components/UI/Bullets/Bullets'
import {useSlide} from '../analytics.hooks'
import {setPageOptions} from '@/store/actions/pagesActions'
import {GroupTotal} from './GroupTotal/GroupTotal'


export const AnalyticsTotal = () => {
  const dispatch = useDispatch()

  const analytics = useSelector(({analytics}) => analytics)

  const countSlides = analytics.length
  const slide = useSlide(countSlides)

  const onChange = index => dispatch(setPageOptions(PAGES.ANALYTICS, {
    slideTotal: index
  }))

  return (
    <div>
      <Gallery
        slideWidth="100%"
        initialSlideIndex={slide}
        style={{height: 'unset'}}
        onChange={onChange}
      >
        {analytics.map(a => <GroupTotal key={a.date} analytic={a}/>)}
      </Gallery>
      <Bullets num={slide} max={countSlides - 1}/>
    </div>
  )
}
