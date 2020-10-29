import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Root, ScreenSpinner} from '@vkontakte/vkui'
import {Intro} from './views/Intro/Intro'
import {Main} from './views/Main/Main'
import {Settings} from './views/Settings/Settings'
import {bridgeAppGetUserInfo} from './core/bridge'
import {hideLoader} from './store/actions/appActions'
import {StateProcessor} from './core/StateProcessor'
import {TYPES_DATA_STATE as types} from './constants/constants'
import {setUser} from './store/actions/userActions'
import {setWallets} from './store/actions/walletsActions'

export const App = () => {
  const dispatch = useDispatch()

  const loading = useSelector(({app: {loading}}) => loading)
  const activeView = useSelector(({app: {history}}) =>
    history[history.length - 1].view)

  useEffect(() => {
    const fetchData = async () => {
      const user = await bridgeAppGetUserInfo()
      StateProcessor.userID = user.id
      StateProcessor.getData([types.USER, types.WALLETS]).then(r => {
        dispatch(setUser(r.user))
        dispatch(setWallets(r.wallets))
        dispatch(hideLoader())
      })
    }

    fetchData()
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
