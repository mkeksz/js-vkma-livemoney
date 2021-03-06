import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {ConfigProvider, Root, ScreenSpinner} from '@vkontakte/vkui'
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
import {PlaceholderIOS} from '@/views/PlaceholderIOS/PlaceholderIOS'
import {PlaceholderFail} from '@/views/PlaceholderFail/PlaceholderFail'
import {Empty} from '@/views/Empty/Empty'


export const RootView = ({isIOS}) => {
  const {view} = useSelector(({app}) => getLast(app.history))
  const {popout, loading, intro, failConnect, initialization
  } = useSelector(({app}) => app)

  const popoutJSX = (loading && <ScreenSpinner size="large" />) || popout
  let activeView = intro ? PAGES.INTRO : view

  if (initialization) activeView = 'empty'
  else if (failConnect) activeView = 'placeholderFail'
  else if (isIOS) activeView = 'placeholderIOS'

  return (
    <ConfigProvider>
      <Root activeView={activeView} popout={popoutJSX} modal={<RootModal/>}>
        <Intro id={PAGES.INTRO}/>
        <Main id={PAGES.MAIN}/>
        <Settings id={PAGES.SETTINGS}/>
        <Categories id={PAGES.CATEGORIES}/>
        <Operation id={PAGES.OPERATION}/>
        <Category id={PAGES.CATEGORY}/>
        <Wallet id={PAGES.WALLET}/>
        <Empty id='empty'/>
        <PlaceholderIOS id='placeholderIOS'/>
        <PlaceholderFail id='placeholderFail'/>
      </Root>
    </ConfigProvider>
  )
}

RootView.propTypes = {
  isIOS: PropTypes.bool
}
