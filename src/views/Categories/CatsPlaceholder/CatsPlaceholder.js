import React from 'react'
import {Icon56ServicesOutline} from '@vkontakte/icons'
import {Button, Placeholder} from '@vkontakte/vkui'
import {clickNew} from '../categories.functions'

export const CatsPlaceholder = () => (
  <Placeholder icon={<Icon56ServicesOutline/>}>
    <div>У Вас нет ни одной категории</div>
    <br/>
    <Button size="l" onClick={clickNew}>
      Создать новую категорию
    </Button>
  </Placeholder>
)
