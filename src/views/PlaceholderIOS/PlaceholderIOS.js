import React from 'react'
import {Icon56DoNotDisturbOutline} from '@vkontakte/icons'
import {Placeholder} from '@vkontakte/vkui'

export const PlaceholderIOS = () => (
  <Placeholder stretched icon={<Icon56DoNotDisturbOutline/>}>
    <div>
      На данный момент приложение не работает на устройствах с iOS
    </div>
  </Placeholder>
)
