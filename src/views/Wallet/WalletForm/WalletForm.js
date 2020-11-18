import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {FormLayout, FormLayoutGroup, Input} from '@vkontakte/vkui'
import {MAX_LENGTH_INPUT_BALANCE, MAX_TITLE_WALLET, PAGES
} from '@/constants/constants'
import {inputBalanceFilter} from '@/filters/numbersFilter'
import {setPageOptions} from '@/store/actions/pagesActions'

export const WalletForm = () => {
  const dispatch = useDispatch()

  const {wallet} = useSelector(({pages}) => pages[PAGES.WALLET])

  const changeTitleHandler = ({currentTarget}) => {
    dispatch(setPageOptions(PAGES.WALLET, {
      wallet: {...wallet, title: currentTarget.value}
    }))
  }

  const changeBalanceHandler = ({currentTarget}) => {
    dispatch(setPageOptions(PAGES.WALLET, {
      wallet: {...wallet, balance: inputBalanceFilter(currentTarget.value)}
    }))
  }

  return (
    <FormLayout>
      <FormLayoutGroup>
        <Input
          type="text"
          inputMode="text"
          name="title"
          placeholder="Название счёта"
          maxLength={MAX_TITLE_WALLET}
          value={wallet.title || ''}
          onChange={changeTitleHandler}
        />
        <Input
          type="text"
          inputMode="numeric"
          name="balanceCard"
          maxLength={MAX_LENGTH_INPUT_BALANCE}
          placeholder="Текущий баланс"
          value={wallet.balance || ''}
          onChange={changeBalanceHandler}
        />
      </FormLayoutGroup>
    </FormLayout>
  )
}
