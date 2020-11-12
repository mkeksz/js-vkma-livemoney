import React from 'react'
import {useDispatch} from 'react-redux'
import {Icon56EventOutline} from '@vkontakte/icons'
import {Button, Placeholder} from '@vkontakte/vkui'
import {PAGES} from '@/constants/constants'
import {nextPage} from '@/store/actions/appActions'

export const HistoryPlaceholder = () => {
  const dispatch = useDispatch()

  const onClick = () => dispatch(nextPage({epic: PAGES.WALLETS}))

  return (
    <Placeholder stretched icon={<Icon56EventOutline/>}>
      <div>У Вас пока нет ни одной операции</div>
      <br/>
      <Button size="l" onClick={onClick}>
        Перейти в кошелёк
      </Button>
    </Placeholder>
  )
}
