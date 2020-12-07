import bridge from '@vkontakte/vk-bridge'
import {LINK_APP} from '@/constants/constants'
import {setScheme} from '@/shared/ui'
import storage from '@/core/utils/storage'


export function bridgeInit() {
  bridge.send('VKWebAppInit')
  showSendToClient()
  bridge.subscribe(event => {
    const {type, data} = event.detail
    if (type === 'VKWebAppUpdateConfig') {
      setScheme(data.scheme)
      setViewSettings(data.appearance)
    }
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

export async function storageSet(key, value) {
  await bridge.send('VKWebAppStorageSet', {key, value})
}

export async function storageGet(keys) {
  return await bridge.send('VKWebAppStorageGet', {keys})
}

export function disableSwipeBack() {
  bridge.send('VKWebAppDisableSwipeBack')
}

export function enableSwipeBack() {
  bridge.send('VKWebAppEnableSwipeBack')
}

export function setViewSettings(style) {
  const color = style === 'light' ? '#fff' : '#191919'
  bridge.send('VKWebAppSetViewSettings', {
    'status_bar_style': style === 'light' ? 'dark' : 'light',
    'action_bar_color': color
  }).catch(e => e)
}
