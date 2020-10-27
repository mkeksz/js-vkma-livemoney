import React from 'react'
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

export const Settings = () => {
  return (
    <View activePanel="main">
      <Panel id="main">
        <Group header={<Header mode="primary">Уведомления</Header>}>
          <Cell asideContent={<Switch defaultChecked />}>
            Ежедневное напоминание
          </Cell>
        </Group>
        <Group>
          <SimpleCell
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
