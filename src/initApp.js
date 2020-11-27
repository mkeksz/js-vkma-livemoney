import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {bridgeInit} from '@/core/bridge'
import {prevPage, setPopout} from '@/store/actions/appActions'
import {App} from '@/App'
import store from '@/store/store'
import {getLast} from '@/core/utils/array'


const {dispatch, getState} = store

export default function initApp() {
  library.add(fab, fas, far)

  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('root'))

  bridgeInit()
  window.addEventListener('popstate', e => {
    const timeBack = getState().app.timeBack
    const _history = getState().app.history
    const lastHistory = getLast(_history)
    if (lastHistory.view !== 'main' && (timeBack - Date.now()) > -650) {
      history.forward()
      return
    }

    dispatch(prevPage())
    dispatch(setPopout(null))
  })
}
