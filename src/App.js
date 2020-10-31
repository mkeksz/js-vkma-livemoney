import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Root, ScreenSpinner} from '@vkontakte/vkui'
import store from './store/store'
import {Intro} from './views/Intro/Intro'
import {Main} from './views/Main/Main'
import {Settings} from './views/Settings/Settings'
import {bridgeAppGetClientVersion, bridgeAppGetUserInfo} from './core/bridge'
import {hideLoader, setPlatform} from './store/actions/appActions'
import {StateProcessor} from './core/StateProcessor'
import {TYPES_DATA_STATE as types} from './constants/constants'
import {setUser} from './store/actions/userActions'
import {setWallets} from './store/actions/walletsActions'
import {Wallet} from './views/Wallet/Wallet'

export const App = () => {
  const loading = useSelector(({app}) => app.loading)
  const activeView = useSelector(({app: {history}}) =>
    history[history.length - 1].view)

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Root
      activeView={activeView}
      popout={loading && <ScreenSpinner size="large" />}
    >
      <Intro id="intro"/>
      <Main id="main"/>
      <Settings id="settings"/>
      <Wallet id="wallet"/>
    </Root>
  )
}

async function fetchData() {
  const dispatch = store.dispatch
  const [user, client] = await Promise.all([
    bridgeAppGetUserInfo(),
    bridgeAppGetClientVersion()
  ])
  dispatch(setPlatform(client.platform))
  StateProcessor.userID = user.id
  StateProcessor.getData([types.USER, types.WALLETS]).then(r => {
    dispatch(setUser(r[types.USER]))
    dispatch(setWallets(r[types.WALLETS]))
    dispatch(hideLoader())
  })
}
