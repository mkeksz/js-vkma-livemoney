import React from 'react'
import {useSelector} from 'react-redux'
import {Root} from '@vkontakte/vkui'
import {Intro} from './views/Intro/Intro'
import {Main} from './views/Main/Main'
import {Settings} from './views/Settings/Settings'

export const App = () => {
  const activeView = useSelector(({app: {history}}) =>
    history[history.length - 1].view)

  return (
    <Root activeView={activeView}>
      <Intro id="intro"/>
      <Main id="main"/>
      <Settings id="settings"/>
    </Root>
  )
}
