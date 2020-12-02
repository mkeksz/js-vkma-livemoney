import React from 'react'
import {Placeholder} from '@vkontakte/vkui'
import {Icon56DoNotDisturbOutline} from '@vkontakte/icons'


export const PlaceholderFail = () => (
  <Placeholder stretched icon={<Icon56DoNotDisturbOutline/>}>
    <div>
      Соединение с сервером прервано.
      <br/>
      <br/>
      Возможно, сервис недоступен в Вашем регионе.
      <br/>
      <br/>
      Попробуйте использовать VPN для получения доступа к сервису.
    </div>
  </Placeholder>
)
