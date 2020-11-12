import React from 'react'
import {useDispatch} from 'react-redux'
import {Icon56PaymentCardOutline} from '@vkontakte/icons'
import {Button, Placeholder} from '@vkontakte/vkui'
import {PAGES} from '@/constants/constants'
import {clearPageOptions} from '@/store/actions/pagesActions'
import {nextPage} from '@/store/actions/appActions'


export const WalletsPlaceholder = () => {
  const dispatch = useDispatch()

  const onClickPlaceholder = () => {
    dispatch(clearPageOptions(PAGES.WALLET))
    dispatch(nextPage({view: PAGES.WALLET}))
  }

  return (
    <Placeholder stretched icon={<Icon56PaymentCardOutline/>}>
      <div>У Вас пока нет ни одного счёта</div>
      <br/>
      <Button size="l" onClick={onClickPlaceholder}>
        Создать новый счёт
      </Button>
    </Placeholder>
  )
}
