import React from 'react'
import {useDispatch} from 'react-redux'
import {
  Group,
  Header,
  Switch,
  Cell,
  SimpleCell,
  View,
  Panel
} from '@vkontakte/vkui'
import {Icon28AllCategoriesOutline, Icon28HelpOutline} from '@vkontakte/icons'
import classes from './Settings.module.sass'
import {HeaderPanel} from '../../components/Navigation/HeaderPanel/HeaderPanel'
import {nextPage} from '../../store/actions/appActions'
import {PAGES} from '../../constants/constants'

export const Settings = () => {
  const dispatch = useDispatch()

  const onClickCategories = () => dispatch(nextPage({view: PAGES.CATEGORIES}))

  return (
    <View activePanel="main">
      <Panel id="main">
        <HeaderPanel buttonBack={true}>Настройки</HeaderPanel>
        <Group header={<Header mode="primary">Уведомления</Header>}>
          <Cell asideContent={<Switch defaultChecked />}>
            Ежедневное напоминание
          </Cell>
        </Group>
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
          <SimpleCell href="https://vk.com" expandable before={<Icon28HelpOutline />}>
            Помощь
          </SimpleCell>
        </Group>
      </Panel>
    </View>
  )
}
