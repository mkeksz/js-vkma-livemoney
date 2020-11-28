import React, {useEffect} from 'react'
import bridge from '@vkontakte/vk-bridge'
import {useDispatch} from 'react-redux'
import {fetchInitData} from './stateManager'
import {RootView} from '@/roots/RootView/RootView'
import {hideLoader, setInitialization, setIntro
} from './store/actions/appActions'
import store from '@/store/store'


const {dispatch} = store

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    initData()
    showIntro(dispatch)
  }, [dispatch])

  return <RootView/>
}

async function showIntro(dispatch) {
  const intro = await bridge.send('VKWebAppStorageGet', {'keys': ['intro']})
  const isShowed = intro.keys[0].value
  if (!isShowed) dispatch(setIntro(true))
}

function initData() {
  fetchInitData().then(() => {
    dispatch(setInitialization(false))
    dispatch(hideLoader())
  }).catch(initData)
}
