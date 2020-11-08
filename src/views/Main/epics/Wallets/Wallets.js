import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
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
import {setPageOptions} from '../../../../store/actions/pagesActions'
import {PAGES} from '../../../../constants/constants'
import {nextPage} from '../../../../store/actions/appActions'

const MAX_DEFAULT_SLIDE_INDEX = 1

export const Wallets = () => {
  const dispatch = useDispatch()

  const wallets = useSelector(({wallets}) => wallets)
  const initialSlide = useSelector(({pages}) =>
    pages.wallets.initialSlide > wallets.length + MAX_DEFAULT_SLIDE_INDEX
      ? wallets.length + MAX_DEFAULT_SLIDE_INDEX
      : pages.wallets.initialSlide)

  const [sharedWallet, setSharedWallet] = useState({
    balance: 0,
    realBalance: 0,
    visibleRealBalance: false
  })

  useEffect(() => {
    setSharedWallet(getSharedWallet(wallets))
  }, [wallets, setSharedWallet])

  const onChangeSlide = index => {
    dispatch(setPageOptions(PAGES.WALLETS, {initialSlide: index}))
  }
  const onClickOperation = (type) => {
    dispatch(setPageOptions(PAGES.OPERATION, {type}))
    dispatch(nextPage({view: PAGES.OPERATION}))
  }

  return (
    <View activePanel="main">
      <Panel id="main" centered={true}>
        <HeaderPanel>Кошелёк</HeaderPanel>
        <Gallery
          initialSlideIndex={initialSlide}
          align="center"
          slideWidth="90%"
          bullets={false}
          className={classes.gallery}
          onChange={onChangeSlide}
        >
          <CardWallet type="new"/>
          <CardWallet
            type="shared"
            styles={{backgroundColor: '#353c44', color: '#fff'}}
            options={{
              title: 'Всего',
              balance: sharedWallet.balance,
              realBalance: sharedWallet.realBalance,
              visibleRealBalance: sharedWallet.visibleRealBalance
            }}
          />
          {
            wallets.map(wallet => <CardWallet
              key={wallet.id}
              type="wallet"
              styles={wallet.styles}
              options={{
                title: wallet.title,
                icon: wallet.icon,
                balance: wallet.balance,
                id: wallet.id
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
              onClick={() => onClickOperation('income')}
            >
              Доход
            </Button>
            <Button
              size="l"
              stretched
              mode="outline"
              className={classes.remove}
              onClick={() => onClickOperation('expense')}
            >
              Расход
            </Button>
          </Div>
        </Group>
      </Panel>
    </View>
  )
}

function getSharedWallet(wallets) {
  let balance = 0
  let realBalance = 0
  let visibleRealBalance = false

  wallets.forEach(wallet => {
    realBalance += wallet.balance
    if (wallet.inTotal) balance += wallet.balance
    else visibleRealBalance = true
  })

  return {balance, realBalance, visibleRealBalance}
}
