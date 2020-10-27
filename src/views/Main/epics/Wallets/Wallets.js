import React from 'react'
import {
  Panel,
  View,
  Gallery,
  Div,
  Button,
  Group
} from '@vkontakte/vkui'
import {
  HeaderPanel
} from '../../../../components/Navigation/HeaderPanel/HeaderPanel'
import {CardWallet} from '../../../../components/CardWallet/CardWallet'
import classes from './Wallets.module.sass'

export const Wallets = () => {
  return (
    <View activePanel="main">
      <Panel id="main" centered={true}>
        <HeaderPanel>Кошелёк</HeaderPanel>
        <Gallery
          initialSlideIndex={1}
          align="center"
          slideWidth="90%"
          bullets={false}
          className={classes.gallery}
        >
          <CardWallet/>
          <CardWallet styles={{backgroundColor: '#353c44', color: '#fff'}}/>
          <CardWallet styles={{backgroundColor: '#353c44', color: '#fff'}}/>
        </Gallery>
        <Group className={classes.group}>
          <Div className={classes.buttons}>
            <Button
              size="l"
              stretched
              mode="outline"
              className={classes.add}
            >
              Доход
            </Button>
            <Button
              size="l"
              stretched
              mode="outline"
              className={classes.remove}
            >
              Расход
            </Button>
          </Div>
        </Group>
      </Panel>
    </View>
  )
}
