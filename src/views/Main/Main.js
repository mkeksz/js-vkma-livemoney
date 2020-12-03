import React from 'react'
import {useSelector} from 'react-redux'
import {Epic} from '@vkontakte/vkui'
import {Icon28GraphOutline, Icon28ListOutline, Icon28WalletOutline
} from '@vkontakte/icons'
import {TabbarPanel} from '@/components/Navigation/TabbarPanel/TabbarPanel'
import {Wallets} from './epics/Wallets/Wallets'
import {Analytics} from './epics/Analytics/Analytics'
import {History} from './epics/History/History'
import {getLast} from '@/core/utils/array'
import {PAGES} from '@/constants/constants'


export const Main = () => {
  const activeStory = useSelector(({app}) => getLast(app.history).epic)

  const tabbarItems = [
    {
      id: PAGES.ANALYTICS,
      text: 'Аналитика',
      icon: <Icon28GraphOutline/>
    },
    {
      id: PAGES.WALLETS,
      text: 'Кошелёк',
      icon: <Icon28WalletOutline/>
    },
    {
      id: PAGES.HISTORY,
      text: 'История',
      icon: <Icon28ListOutline/>
    }
  ]

  return (
    <Epic
      activeStory={activeStory}
      tabbar={<TabbarPanel items={tabbarItems} activeStory={activeStory}/>}
    >
      <Analytics id="analytics"/>
      <Wallets id="wallets"/>
      <History id="history"/>
    </Epic>
  )
}
