import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {Div, Group, Header, Input} from '@vkontakte/vkui'
import {MAX_LENGTH_INPUT_BALANCE, PAGES} from '@/constants/constants'
import {change} from './InputAmount.functions'


export const InputAmount = ({refAmount}) => {
  const {operation} = useSelector(({pages}) => pages[PAGES.OPERATION])

  const onChange = ({currentTarget}) => change(currentTarget.value)

  return (
    <Group header={<Header>Сумма</Header>}>
      <Div>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="Введите сумму"
          maxLength={MAX_LENGTH_INPUT_BALANCE}
          value={operation.amount || ''}
          onChange={onChange}
          getRef={refAmount}
        />
      </Div>
    </Group>
  )
}

InputAmount.propTypes = {
  refAmount: PropTypes.object.isRequired
}
