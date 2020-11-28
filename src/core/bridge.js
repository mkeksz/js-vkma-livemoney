import bridge from '@vkontakte/vk-bridge'
import {LINK_APP} from '@/constants/constants'
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

export function showSendToClient() {
  const showed = storage('sendToClient')
  if (!showed) {
    bridge.send('VKWebAppSendToClient').catch(r => r)
    storage('sendToClient', true)
  }
}

export function showWallPostBox(text = LINK_APP, link = LINK_APP) {
  bridge.send('VKWebAppShowWallPostBox', {
    message: text,
    attachments: link
  }).catch(r => r)
}

export function storageSet(key, value) {
  bridge.send('VKWebAppStorageSet', {key, value})
}

export function disableSwipeBack() {
  bridge.send('VKWebAppDisableSwipeBack')
}

export function enableSwipeBack() {
  bridge.send('VKWebAppEnableSwipeBack')
}
