import React from 'react'
import {useDispatch} from 'react-redux'
import {Group, SimpleCell} from '@vkontakte/vkui'
import {Icon28AllCategoriesOutline, Icon28HelpOutline} from '@vkontakte/icons'
import {PAGES} from '@/constants/constants'
import {nextPage} from '@/store/actions/appActions'
import {RootPanel} from '@/roots/RootPanel/RootPanel'
import {setPageOptions} from '@/store/actions/pagesActions'
import classes from './Settings.module.sass'


export const Settings = () => {
  const dispatch = useDispatch()

  const onClickCategories = () => {
    dispatch(setPageOptions(PAGES.CATEGORIES, {date: null}))
    dispatch(nextPage({view: PAGES.CATEGORIES}))
  }

  return (
    <RootPanel header={{back: true, content: 'Настройки'}} fixed={true}>
      <Group>
        <SimpleCell
          onClick={onClickCategories}
          expandable
          before={<Icon28AllCategoriesOutline />}
        >
          Категории
        </SimpleCell>
      </Group>
      <Group className={classes.lastGroup}>
        <SimpleCell
          href="https://vk.com/mybudgets"
          expandable
          before={<Icon28HelpOutline />}
          target='_blank'
        >
          Сообщество
        </SimpleCell>
      </Group>
    </RootPanel>
  )
}
