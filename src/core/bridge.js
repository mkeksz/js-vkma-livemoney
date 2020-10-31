import bridge from '@vkontakte/vk-bridge'

export function bridgeInit() {
  bridge.send('VKWebAppInit')
  bridge.send('VKWebAppEnableSwipeBack')
  bridge.subscribe((event) => {
    const {type, data} = event.detail
    if (type === 'VKWebAppUpdateConfig') {
      const schemeAttribute = document.createAttribute('scheme')
      schemeAttribute.value = data.scheme ? data.scheme : 'client_light'
      document.body.attributes.setNamedItem(schemeAttribute)
    }
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
