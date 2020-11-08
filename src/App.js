import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ModalRoot, Root, ScreenSpinner} from '@vkontakte/vkui'
import store from './store/store'
import {Intro} from './views/Intro/Intro'
import {Main} from './views/Main/Main'
import {Settings} from './views/Settings/Settings'
import {bridgeAppGetClientVersion, bridgeAppGetUserInfo} from './core/bridge'
import {
  hideLoader,
  prevPage,
  setPlatform,
  setTimezone
} from './store/actions/appActions'
import {StateProcessor} from './core/StateProcessor'
import {PAGES} from './constants/constants'
import {setUser} from './store/actions/userActions'
import {setWallets} from './store/actions/walletsActions'
import {Wallet} from './views/Wallet/Wallet'
import {ModalIcons} from './modals/ModalIcons/ModalIcons'
import {Categories} from './views/Categories/Categories'
import {setCategories} from './store/actions/categoriesActions'
import {Category} from './views/Category/Category'
import {Operation} from './views/Operation/Operation'
import {setOperations} from './store/actions/operationsActions'

export const App = () => {
  const dispatch = useDispatch()

  const loading = useSelector(({app}) => app.loading)
  const {view, modal, popout} = useSelector(({app: {history}}) =>
    history[history.length - 1])

  useEffect(() => {
    fetchData()
  }, [])

  const closeModalHandler = () => dispatch(prevPage())

  return (
    <Root
      activeView={view}
      popout={(loading && <ScreenSpinner size="large" />) || popout}
      modal={
        <ModalRoot activeModal={modal} onClose={closeModalHandler}>
          <ModalIcons id={PAGES.MODAL_ICONS}/>
        </ModalRoot>
      }
    >
      <Intro id={PAGES.INTRO}/>
      <Main id={PAGES.MAIN}/>
      <Settings id={PAGES.SETTINGS}/>
      <Wallet id={PAGES.WALLET}/>
      <Categories id={PAGES.CATEGORIES}/>
      <Category id={PAGES.CATEGORY}/>
      <Operation id={PAGES.OPERATION}/>
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
  dispatch(setTimezone(userInfo.timezone))

  StateProcessor.userID = userInfo.id
  const [wallets, user, categories, operations] = await Promise.all([
    StateProcessor.getWallets(),
    StateProcessor.getUser(),
    StateProcessor.getCategories(),
    StateProcessor.getOperations(0, 5000)
  ])
  dispatch(setUser(user))
  dispatch(setWallets(wallets))
  dispatch(setCategories(categories))
  dispatch(setOperations(operations))
  dispatch(hideLoader())
}
