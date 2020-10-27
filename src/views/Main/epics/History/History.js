import React from 'react'
import {Panel, View} from '@vkontakte/vkui'
import {
  HeaderPanel
} from '../../../../components/Navigation/HeaderPanel/HeaderPanel'

export const History = () => {
  return (
    <View activePanel="main">
      <Panel id="main">
        <HeaderPanel>История</HeaderPanel>
      </Panel>
    </View>
  )
}
