import 'core-js/es/map'
import 'core-js/es/set'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import '@vkontakte/vkui/dist/vkui.css'
import {App} from './App'
import store from './store/store'
import {bridgeInit} from './core/bridge'
import {prevPage} from './store/actions/appActions'

library.add(fab, fas, far)

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

bridgeInit()
window.addEventListener('popstate', () => store.dispatch(prevPage()))
