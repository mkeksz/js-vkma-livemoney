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
      wallet: {...wallet, title: currentTarget.value.slice(0, MAX_TITLE_WALLET)}
    }))
  }

  const changeBalanceHandler = ({currentTarget}) => {
    dispatch(setPageOptions(PAGES.WALLET, {
      wallet: {
        ...wallet,
        balance: inputBalanceFilter(currentTarget.value, true)
      }
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
          inputMode="decimal"
          name="balanceCard"
          maxLength={MAX_LENGTH_INPUT_BALANCE + 1}
          placeholder="Текущий баланс"
          value={inputBalanceFilter(wallet.balance, true) || ''}
          onChange={changeBalanceHandler}
        />
      </FormLayoutGroup>
    </FormLayout>
  )
}
