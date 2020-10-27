import 'core-js/es/map'
import 'core-js/es/set'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {App} from './App'
import '@vkontakte/vkui/dist/vkui.css'
import store from './store/store'
import {bridgeInit} from './bridge'
import {prevPage} from './store/actions/appActions'

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

bridgeInit()
window.addEventListener('popstate', () => store.dispatch(prevPage()))
