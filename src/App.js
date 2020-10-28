import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Root, ScreenSpinner} from '@vkontakte/vkui'
import {Intro} from './views/Intro/Intro'
import {Main} from './views/Main/Main'
import {Settings} from './views/Settings/Settings'
import {bridgeAppGetUserInfo} from './core/bridge'
import {setUserId} from './store/actions/userActions'
import {hideLoader} from './store/actions/appActions'

export const App = () => {
  const dispatch = useDispatch()

  const loading = useSelector(({app: {loading}}) => loading)
  const activeView = useSelector(({app: {history}}) =>
    history[history.length - 1].view)

  useEffect(() => {
    const fetchData = async () => await bridgeAppGetUserInfo()

    fetchData().then(user => {
      dispatch(setUserId(user.id))
      dispatch(hideLoader())
    })
  }, [dispatch])

  return (
    <Root
      activeView={activeView}
      popout={loading && <ScreenSpinner size="large" />}
    >
      <Intro id="intro"/>
      <Main id="main"/>
      <Settings id="settings"/>
    </Root>
  )
}
