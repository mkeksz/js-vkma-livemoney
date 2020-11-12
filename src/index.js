import 'core-js/es/map'
import 'core-js/es/set'
import '@vkontakte/vkui/dist/vkui.css'
import initApp from './initApp'

if (process.env.NODE_ENV === 'development') import('./eruda').then(initApp)
else initApp()
