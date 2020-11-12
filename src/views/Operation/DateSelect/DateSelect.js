import React from 'react'
import HorizontalCalendar from 'vkui-horizontal-calendar'
import {useSelector} from 'react-redux'
import {Group, Header} from '@vkontakte/vkui'
import {PAGES} from '@/constants/constants'
import {click} from './dateSelect.functions'
import {useCalendar} from './dateSelect.hooks'


export const DateSelect = () => {
  const {choosedDate} = useSelector(({pages}) => pages[PAGES.OPERATION])
  const dateCalendar = useCalendar()

  const onClick = ({dayNumber}) => click(dayNumber)

  return (
    <Group header={<Header>Дата</Header>}>
      <HorizontalCalendar
        date={dateCalendar}
        choosed={choosedDate}
        isDarkWeekend={false}
        onClick={onClick}
      />
    </Group>
  )
}
