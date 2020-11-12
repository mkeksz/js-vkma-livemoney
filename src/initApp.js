import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {bridgeInit} from '@/core/bridge'
import {prevPage} from '@/store/actions/appActions'
import {App} from '@/App'
import store from '@/store/store'

export default function initApp() {
  library.add(fab, fas, far)

  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('root'))

  bridgeInit()
  window.addEventListener('popstate', () => store.dispatch(prevPage()))
}
