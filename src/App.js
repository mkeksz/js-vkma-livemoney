import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ModalRoot, Root, ScreenSpinner} from '@vkontakte/vkui'
import store from './store/store'
import {Intro} from './views/Intro/Intro'
import {Main} from './views/Main/Main'
import {Settings} from './views/Settings/Settings'
import {bridgeAppGetClientVersion, bridgeAppGetUserInfo} from './core/bridge'
import {hideLoader, prevPage, setPlatform} from './store/actions/appActions'
import {StateProcessor} from './core/StateProcessor'
import {PAGES} from './constants/constants'
import {setUser} from './store/actions/userActions'
import {setWallets} from './store/actions/walletsActions'
import {Wallet} from './views/Wallet/Wallet'
import {ModalIcons} from './modals/ModalIcons/ModalIcons'

export const App = () => {
  const dispatch = useDispatch()

  const loading = useSelector(({app}) => app.loading)
  const activeView = useSelector(({app: {history}}) =>
    history[history.length - 1].view)
  const activeModal = useSelector(({app: {history}}) =>
    history[history.length - 1].modal)

  useEffect(() => {
    fetchData()
  }, [])

  const closeModalHandler = () => dispatch(prevPage())

  return (
    <Root
      activeView={activeView}
      popout={loading && <ScreenSpinner size="large" />}
      modal={
        <ModalRoot activeModal={activeModal} onClose={closeModalHandler}>
          <ModalIcons id={PAGES.MODAL_ICONS}/>
        </ModalRoot>
      }
    >
      <Intro id={PAGES.INTRO}/>
      <Main id={PAGES.MAIN}/>
      <Settings id={PAGES.SETTINGS}/>
      <Wallet id={PAGES.WALLET}/>
    </Root>
  )
}

async function fetchData() {
  const dispatch = store.dispatch
  const [userInfo, client] = await Promise.all([
    bridgeAppGetUserInfo(),
    bridgeAppGetClientVersion()
  ])
  dispatch(setPlatform(client.platform))
  StateProcessor.userID = userInfo.id
  const [wallets, user] = await Promise.all([
    StateProcessor.getWallets(),
    StateProcessor.getUser()
  ])
  dispatch(setUser(user))
  dispatch(setWallets(wallets))
  dispatch(hideLoader())
}
