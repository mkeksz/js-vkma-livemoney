import bridge from '@vkontakte/vk-bridge'
import {setScheme} from '@/shared/ui'
import storage from '@/core/utils/storage'


export function bridgeInit() {
  bridge.send('VKWebAppInit')
  bridge.send('VKWebAppEnableSwipeBack')
  showSendToClient()
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

export function showSendToClient() {
  const showed = storage('sendToClient')
  if (!showed) {
    bridge.send('VKWebAppSendToClient').catch(r => r)
    storage('sendToClient', true)
  }
}
