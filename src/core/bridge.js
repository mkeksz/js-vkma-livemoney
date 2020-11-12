import bridge from '@vkontakte/vk-bridge'
import {setScheme} from '@/shared/ui'

export function bridgeInit() {
  bridge.send('VKWebAppInit')
  bridge.send('VKWebAppEnableSwipeBack')
  bridge.subscribe(event => {
    const {type, data} = event.detail
    if (type === 'VKWebAppUpdateConfig') setScheme(data.scheme)
  })
}

export function bridgeAppClose() {
  bridge.send('VKWebAppClose', {status: 'success'})
}

export async function bridgeAppGetUserInfo() {
  return await bridge.send('VKWebAppGetUserInfo')
}

export async function bridgeAppGetClientVersion() {
  return await bridge.send('VKWebAppGetClientVersion')
}
