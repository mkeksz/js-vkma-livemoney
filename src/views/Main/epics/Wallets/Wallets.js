import React from 'react'
import {useSelector} from 'react-redux'
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
  const wallets = useSelector(({wallets}) => wallets.activeWallets)

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
          <CardWallet type="new"/>
          <CardWallet
            type="shared"
            styles={{backgroundColor: '#353c44', color: '#fff'}}
            options={{title: 'Всего', balance: 1340, realBalance: 700}}
          />
          {
            wallets.map(wallet => <CardWallet
              key={wallet.id}
              type="wallet"
              styles={wallet.styles}
              options={{
                title: wallet.title,
                icon: wallet.icon,
                balance: wallet.balance
              }}
            />)
          }
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
