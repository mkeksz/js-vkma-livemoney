import React from 'react'
import {useSelector} from 'react-redux'
import {Div, Group, Header, Input} from '@vkontakte/vkui'
import {MAX_LENGTH_DESCRIPTION_CATEGORY, PAGES} from '@/constants/constants'
import {change} from './inputDescription.functions'


export const InputDescription = () => {
  const {operation} = useSelector(({pages}) => pages[PAGES.OPERATION])

  const onChangeDescription = ({currentTarget}) => change(currentTarget.value)

  return (
    <Group header={<Header>Комментарий (необязательно)</Header>}>
      <Div>
        <Input
          type="text"
          inputMode="text"
          placeholder="Введите комментарий"
          maxLength={MAX_LENGTH_DESCRIPTION_CATEGORY}
          value={operation.description || ''}
          onChange={onChangeDescription}
        />
      </Div>
    </Group>
  )
}
