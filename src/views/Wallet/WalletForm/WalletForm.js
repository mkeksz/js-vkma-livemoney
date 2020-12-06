import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {FormLayout, FormLayoutGroup, Input, Tooltip} from '@vkontakte/vkui'
import {MAX_LENGTH_INPUT_BALANCE, MAX_TITLE_WALLET, PAGES
} from '@/constants/constants'
import {inputBalanceFilter} from '@/filters/numbersFilter'
import {setPageOptions} from '@/store/actions/pagesActions'


export const WalletForm = ({tooltips}) => {
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
        <Tooltip
          header='Введи название счёта'
          text='Это может быть имя банка, вклад и т.п.'
          isShown={tooltips.name.show}
          onClose={tooltips.name.on}
        >
          <Input
            type="text"
            inputMode="text"
            name="title"
            placeholder="Название счёта"
            maxLength={MAX_TITLE_WALLET}
            value={wallet.title || ''}
            onChange={changeTitleHandler}
          />
        </Tooltip>
        <Tooltip
          header='Введи текущий баланс'
          text='Какая сумма есть у тебя сейчас?'
          isShown={tooltips.balance.show}
          onClose={tooltips.balance.on}
        >
          <Input
            type="text"
            inputMode="decimal"
            name="balanceCard"
            maxLength={MAX_LENGTH_INPUT_BALANCE + 1}
            placeholder="Текущий баланс"
            value={inputBalanceFilter(wallet.balance, true) || ''}
            onChange={changeBalanceHandler}
          />
        </Tooltip>
      </FormLayoutGroup>
    </FormLayout>
  )
}

WalletForm.propTypes = {
  tooltips: PropTypes.object
}
