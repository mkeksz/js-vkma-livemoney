import React, {useEffect} from 'react'
import bridge from '@vkontakte/vk-bridge'
import {useDispatch} from 'react-redux'
import {fetchInitData} from './stateManager'
import {RootView} from '@/roots/RootView/RootView'
import {hideLoader, nextPage, setInitialization
} from './store/actions/appActions'


export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    showIntro(dispatch)
    fetchInitData().then(() => {
      dispatch(setInitialization(false))
      dispatch(hideLoader())
    })
  }, [dispatch])

  return <RootView/>
}

async function showIntro(dispatch) {
  const intro = await bridge.send('VKWebAppStorageGet', {'keys': ['intro']})
  const isShowed = intro.keys[0].value
  if (!isShowed) {
    dispatch(nextPage({view: 'intro'}))
    bridge.send('VKWebAppStorageSet', {
      'key': 'intro',
      'value': 'true'
    }).then()
  }
}
