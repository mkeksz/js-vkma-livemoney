import React from 'react'
import {Panel, View} from '@vkontakte/vkui'
import {HeaderPanel} from '../../components/Navigation/HeaderPanel/HeaderPanel'
import {useSelector} from 'react-redux'
import {PAGES} from '../../constants/constants'
// import classes from './Wallet.module.sass'

export const Wallet = () => {
  const id = useSelector(({pages}) => pages[PAGES.WALLET].id)
  const isEdit = !!id

  return (
    <View activePanel="main">
      <Panel id="main">
        <HeaderPanel buttonBack={true}>
          {isEdit ? 'Редактирование кошелька' : 'Создание кошелька'}
        </HeaderPanel>
      </Panel>
    </View>
  )
}
