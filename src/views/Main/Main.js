import React from 'react'
import {useSelector} from 'react-redux'
import {Epic} from '@vkontakte/vkui'
import {
  Icon28GraphOutline, Icon28ListOutline, Icon28PaymentCardOutline
} from '@vkontakte/icons'
import {TabbarPanel} from '@/components/Navigation/TabbarPanel/TabbarPanel'
import {Wallets} from './epics/Wallets/Wallets'
import {Analytics} from './epics/Analytics/Analytics'
import {History} from './epics/History/History'


export const Main = () => {
  const activeStory = useSelector(({app: {history}}) =>
    history[history.length - 1].epic)

  const items = [
    {
      id: 'analytics',
      text: 'Аналитики',
      icon: <Icon28GraphOutline />
    },
    {
      id: 'wallets',
      text: 'Кошелёк',
      icon: <Icon28PaymentCardOutline />
    },
    {
      id: 'history',
      text: 'История',
      icon: <Icon28ListOutline />
    }
  ]


  return (
    <Epic
      activeStory={activeStory}
      tabbar={<TabbarPanel items={items} activeStory={activeStory}/>}
    >
      <Analytics id="analytics"/>
      <Wallets id="wallets"/>
      <History id="history"/>
    </Epic>
  )
}
