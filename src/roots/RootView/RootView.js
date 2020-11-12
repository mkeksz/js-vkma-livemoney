import React from 'react'
import {useSelector} from 'react-redux'
import {Root, ScreenSpinner} from '@vkontakte/vkui'
import {PAGES} from '@/constants/constants'
import {RootModal} from '@/roots/RootModal/RootModal'
import {Intro} from '@/views/Intro/Intro'
import {Main} from '@/views/Main/Main'
import {Settings} from '@/views/Settings/Settings'
import {Categories} from '@/views/Categories/Categories'
import {Operation} from '@/views/Operation/Operation'
import {Category} from '@/views/Category/Category'
import {Wallet} from '@/views/Wallet/Wallet'
import {getLast} from '@/core/utils/array'


export const RootView = () => {
  const {view, popout} = useSelector(({app}) => getLast(app.history))
  const loading = useSelector(({app}) => app.loading)

  const popoutJSX = (loading && <ScreenSpinner size="large" />) || popout

  return (
    <Root activeView={view} popout={popoutJSX} modal={<RootModal/>}>
      <Intro id={PAGES.INTRO}/>
      <Main id={PAGES.MAIN}/>
      <Settings id={PAGES.SETTINGS}/>
      <Categories id={PAGES.CATEGORIES}/>
      <Operation id={PAGES.OPERATION}/>
      <Category id={PAGES.CATEGORY}/>
      <Wallet id={PAGES.WALLET}/>
    </Root>
  )
}
