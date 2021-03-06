import React from 'react'
import {useSelector} from 'react-redux'
import {FormLayoutGroup, Input} from '@vkontakte/vkui'
import {MAX_LENGTH_INPUT_BALANCE, PAGES} from '@/constants/constants'
import {change} from './categoryBudget.functions'


export const CategoryBudget = () => {
  const {category} = useSelector(({pages}) => pages[PAGES.CATEGORY])

  const onChange = ({currentTarget}) => change(currentTarget.value)

  return (
    <FormLayoutGroup top="Бюджет в месяц">
      <Input
        type="text"
        maxLength={MAX_LENGTH_INPUT_BALANCE}
        value={category.budget || ''}
        name="budget"
        onChange={onChange}
        placeholder="Бюджет на месяц"
        inputMode="decimal"
      />
    </FormLayoutGroup>
  )
}
