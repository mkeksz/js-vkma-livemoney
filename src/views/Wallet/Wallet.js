import React, {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  Cell, FormLayout, FormLayoutGroup, Group, Input, Panel, Switch, View, Header,
  HorizontalScroll
} from '@vkontakte/vkui'
import {COLORS, MAX_LENGTH_INPUT_BALANCE, PAGES} from '@/constants/constants'
import {HeaderPanel} from '@/components/Navigation/HeaderPanel/HeaderPanel'
import {CardExample} from './CardExample/CardExample'
import {inputBalanceFilter} from '@/filters/numbersFilter'
import {CircleColor} from './CircleColor/CircleColor'
import {setWallets} from '@/store/actions/walletsActions'
import {
  hideLoader, nextPage, prevPage, showLoader
} from '@/store/actions/appActions'
import {setPageOptions} from '@/store/actions/pagesActions'
import {PopoutAlert} from '@/components/UI/PopoutAlert/PopoutAlert'
import {ButtonDelete} from '@/components/UI/ButtonDelete/ButtonDelete'
import {ButtonSave} from '@/components/UI/ButtonSave/ButtonSave'
import {StateProcessor} from '@/core/StateProcessor'
import store from '@/store/store'


function saveAndClose(newWallets) {
  store.dispatch(setWallets(newWallets))
  store.dispatch(hideLoader())
  store.dispatch(prevPage())
}

export const Wallet = () => {
  const dispatch = useDispatch()

  const {id, icon} = useSelector(({pages}) => pages[PAGES.WALLET])
  const inTotalInput = useRef(null)
  const isEdit = id !== null
  const [wallet, setWallet] = useState({
    title: '',
    balance: '',
    inTotal: true,
    styles: COLORS.DODGER_BLUE
  })
  const [colors, setColors] = useState([])

  if (inTotalInput.current) inTotalInput.current.checked = wallet.inTotal

  useEffect(() => {
    const _colors = Object.values(COLORS)
    if (id) {
      const wallets = store.getState().wallets
      const _wallet = wallets.find(wallet => wallet.id === id)
      setWallet(_wallet)
    }
    setColors(_colors)
  }, [id, setColors, setWallet])

  const changeTitleHandler = ({currentTarget}) =>
    setWallet({...wallet, title: currentTarget.value})
  const changeBalanceHandler = ({currentTarget}) =>
    setWallet({...wallet, balance: inputBalanceFilter(currentTarget.value)})
  const changeInTotalHandler = () =>
    setWallet({...wallet, inTotal: !wallet.inTotal})
  const clickColorHandler = (colorID) => {
    const color = colors.find(color => color.id === colorID)
    setWallet({...wallet, styles: color})
  }
  const onSave = () => {
    const newWallet = {
      id,
      title: wallet.title || 'Новый счёт',
      icon,
      balance: +wallet.balance,
      styles: wallet.styles,
      inTotal: wallet.inTotal
    }
    dispatch(showLoader())
    if (!isEdit) dispatch(setPageOptions(PAGES.WALLETS, {initialSlide: 1}))
    StateProcessor.saveWallet(newWallet).then(saveAndClose)
  }
  const onDelete = () => {
    dispatch(nextPage({popout: (
      <PopoutAlert
        title={`Удалить ${wallet.title || 'Новый счёт'}?`}
        button={{title: 'Удалить', action: () => {
          dispatch(showLoader())
          StateProcessor.deleteWallet(id).then(saveAndClose)
        }}}
      >
        Кошелёк нельзя будет восстановить.
        <br/>Все операции связанные с кошельком останутся.
      </PopoutAlert>
    )}))
  }


  return (
    <View activePanel="main">
      <Panel id="main">

        <HeaderPanel buttonBack={true}>
          {isEdit ? 'Редактирование счёта' : 'Создание счёта'}
        </HeaderPanel>

        <div>
          <CardExample wallet={wallet} icon={icon}/>
        </div>

        <FormLayout>
          <FormLayoutGroup>
            <Input
              type="text"
              inputMode="text"
              name="title"
              placeholder="Название счёта"
              maxLength="70"
              value={wallet.title}
              onChange={changeTitleHandler}
            />
            <Input
              type="text"
              inputMode="numeric"
              name="balanceCard"
              maxLength={MAX_LENGTH_INPUT_BALANCE}
              placeholder="Текущий баланс"
              value={wallet.balance}
              onChange={changeBalanceHandler}
            />
          </FormLayoutGroup>
        </FormLayout>

        <Group header={<Header mode="primary">Оформление</Header>}>
          <HorizontalScroll style={{padding: '0 10px'}}>
            <div style={{display: 'flex'}}>
              {colors.map(color => (
                <CircleColor
                  key={color.id}
                  color={color}
                  onClick={clickColorHandler}
                  selected={color.id === wallet.styles.id}
                />
              ))}
            </div>
          </HorizontalScroll>
        </Group>

        <Group>
          <Cell
            asideContent={
              <Switch
                name="inBalance"
                defaultChecked={wallet.inTotal}
                onChange={changeInTotalHandler}
                getRef={inTotalInput}
              />
            }
          >
            Учитывать в общем балансе
          </Cell>
        </Group>

        {isEdit && <ButtonDelete onClick={onDelete}/>}
        <ButtonSave onClick={onSave}/>
      </Panel>
    </View>
  )
}
