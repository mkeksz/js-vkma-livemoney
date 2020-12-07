import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {usePlatform, IOS} from '@vkontakte/vkui'
import {fetchInitData} from './stateManager'
import {RootView} from '@/roots/RootView/RootView'
import {storageGet} from '@/core/bridge'
import {setTooltip} from '@/store/actions/tooltipActions'
import {hideLoader, setFailConnect, setInitialization, setIntro
} from './store/actions/appActions'
import {KEYS_STORAGE_VK as KSVK} from '@/constants/constants'
import store from '@/store/store'


const {dispatch} = store

export const App = () => {
  const dispatch = useDispatch()
  const platform = usePlatform()

  useEffect(() => {
    if (platform === IOS) {
      dispatch(hideLoader())
      return
    }
    initData()
  }, [dispatch, platform])

  return <RootView isIOS={platform === IOS}/>
}

async function initialization() {
  const data = await storageGet([
    KSVK.INTRO,
    KSVK.TOOLTIP_WALLETS,
    KSVK.TOOLTIP_EDIT_WALLET,
    KSVK.TOOLTIP_ANALYTICS,
    KSVK.TOOLTIP_OPERATION
  ])
  const [intro, ttWallets, ttEditWallet, ttAnalytics, ttOperation] = data.keys
  if (!intro.value) dispatch(setIntro(true))
  if (!ttWallets.value) dispatch(setTooltip('wallets', true))
  if (!ttEditWallet.value) dispatch(setTooltip('editWallet', true))
  if (!ttAnalytics.value) dispatch(setTooltip('analytics', true))
  if (!ttOperation.value) dispatch(setTooltip('operation', true))

  dispatch(setInitialization(false))
  dispatch(hideLoader())
}

function initData(numTry = 1) {
  if (numTry >= 16) {
    dispatch(setFailConnect(true))
    dispatch(setInitialization(false))
    dispatch(hideLoader())
    return
  }

  setTimeout(() => {
    fetchInitData().then(initialization).catch(() => initData(numTry + 1))
  }, numTry === 1 ? 0 : 500)
}
