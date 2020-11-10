import React, {useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Group, Header, Panel, View, Div, Input, Button} from '@vkontakte/vkui'
import {HeaderPanel} from '../../components/Navigation/HeaderPanel/HeaderPanel'
import {MAX_LENGTH_INPUT_BALANCE, PAGES} from '../../constants/constants'
import classes from './Operation.module.sass'
import {ItemOperation} from './ItemOperation/ItemOperation'
import {inputBalanceFilter} from '../../filters/numbersFilter'
import {
  hideLoader,
  nextPage,
  prevPage,
  showLoader
} from '../../store/actions/appActions'
import {
  clearPageOptions,
  setPageOptions
} from '../../store/actions/pagesActions'
import {StateProcessor} from '../../core/StateProcessor'
import store from '../../store/store'
import {setOperations} from '../../store/actions/operationsActions'

function saveAndClose(newOperations) {
  store.dispatch(setOperations(newOperations))
  store.dispatch(hideLoader())
  store.dispatch(prevPage())
}

export const Operation = () => {
  const dispatch = useDispatch()

  const {
    type,
    id,
    amount,
    description,
    fromSelected,
    toSelected
  } = useSelector(({pages}) => pages[PAGES.OPERATION])
  const {income, expense} = useSelector(({categories}) => categories)
  const wallets = useSelector(({wallets}) => wallets)

  const anchorTo = useRef(null)
  const anchorAmount = useRef(null)
  const inputAmount = useRef(null)

  const isEdit = id !== null
  const title = type === 'expense' ? 'Расход' : 'Доход'

  const onChangeAmount = ({currentTarget}) =>
    dispatch(setPageOptions(PAGES.OPERATION, {
      amount: inputBalanceFilter(currentTarget.value)
    }))
  const onChangeDescription = ({currentTarget}) =>
    dispatch(setPageOptions(PAGES.OPERATION, {
      description: currentTarget.value
    }))
  const onClickNewCategory = () => {
    dispatch(clearPageOptions(PAGES.CATEGORY))
    dispatch(setPageOptions(PAGES.CATEGORY, {type}))
    dispatch(nextPage({view: PAGES.CATEGORY}))
  }
  const onClickNewWallet = () => {
    dispatch(clearPageOptions(PAGES.WALLET))
    dispatch(nextPage({view: PAGES.WALLET}))
  }
  const onClickItem = (type, id, direction) => {
    if (direction === 'from') {
      dispatch(setPageOptions(PAGES.OPERATION, {
        fromSelected: {type, itemID: id}
      }))
      nextAnchor()
    } else {
      dispatch(setPageOptions(PAGES.OPERATION, {
        toSelected: {type, itemID: id}
      }))
      nextAnchor(true)
    }
  }
  const onClickSave = () => {
    const operation = {
      id,
      amount: +amount,
      date: new Date().toISOString(),
      type: fromSelected.type === 'wallet' && toSelected.type === 'wallet'
        ? 'transfer'
        : type,
      description,
      from: fromSelected,
      to: toSelected
    }

    dispatch(showLoader())
    StateProcessor.saveOperation(operation).then(newOperations => {
      const fromWallet = fromSelected.type === 'wallet'
        ? wallets.find(wallet => wallet.id === fromSelected.itemID)
        : null
      const toWallet = toSelected.type === 'wallet'
        ? wallets.find(wallet => wallet.id === toSelected.itemID)
        : null

      if (fromWallet) fromWallet.balance -= +amount
      if (toWallet) toWallet.balance += +amount

      Promise.all([
        StateProcessor.saveWallet(fromWallet),
        StateProcessor.saveWallet(toWallet)
      ]).then(() => saveAndClose(newOperations))
    })
  }


  return (
    <View activePanel="main">
      <Panel id="main">
        <HeaderPanel buttonBack={true}>{title}</HeaderPanel>

        <Group header={<Header>Откуда</Header>}>
          <Div className={classes.items}>
            {renderItems(
                wallets,
              type === 'expense' ? null : income,
              'from'
            )}
          </Div>
        </Group>
        <div ref={anchorTo}/>
        <Group header={<Header>Куда</Header>}>
          <Div className={classes.items}>
            {renderItems(
                wallets,
              type === 'expense' ? expense : null,
              'to'
            )}
          </Div>
        </Group>
        <div ref={anchorAmount}/>
        <Group header={<Header>Сумма</Header>}>
          <Div>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="Введите сумму"
              maxLength={MAX_LENGTH_INPUT_BALANCE}
              value={amount}
              onChange={onChangeAmount}
              getRef={inputAmount}
            />
          </Div>
        </Group>

        <Group header={<Header>Комментарий (необязательно)</Header>}>
          <Div>
            <Input
              type="text"
              inputMode="text"
              placeholder="Введите комментарий"
              maxLength="30"
              value={description}
              onChange={onChangeDescription}
            />
          </Div>
        </Group>

        {isEdit && (
          <Div style={{paddingTop: '20px'}}>
            <Button size="l" mode="destructive">
              УДАЛИТЬ ОПЕРАЦИЮ
            </Button>
          </Div>
        )}

        <Div style={{paddingTop: '20px', paddingBottom: '25px'}}>
          <Button
            size="xl"
            mode="commerce"
            disabled={+amount <= 0}
            onClick={onClickSave}
          >
            {isEdit ? 'СОХРАНИТЬ' : 'СОЗДАТЬ'}
          </Button>
        </Div>

      </Panel>
    </View>
  )

  function nextAnchor(toAmount = false) {
    const options = {behavior: 'smooth', block: 'start'}

    if (!toSelected.id && !toAmount) anchorTo.current['scrollIntoView'](options)
    else {
      anchorAmount.current['scrollIntoView'](options)
      inputAmount.current['focus']()
    }
  }

  function renderItems(wallets, categories = null, direction) {
    return (
      <>
        {categories && categories.map(category => (
          <ItemOperation
            key={category.id}
            item={category}
            type='category'
            text={category.title}
            checked={
              direction === 'from'
                ? fromSelected.type === 'category'
                && fromSelected.itemID === category.id
                : toSelected.type === 'category'
                && toSelected.itemID === category.id
            }
            onClick={() => onClickItem('category', category.id, direction)}
          />
        ))}
        {categories && (
          <ItemOperation
            type='new'
            text='Категория'
            onClick={onClickNewCategory}
          />
        )}
        {wallets && wallets.map(wallet => (
          <ItemOperation
            key={wallet.id}
            item={wallet}
            type='wallet'
            text={wallet.title}
            checked={
              direction === 'from'
                ? fromSelected.type === 'wallet'
                && fromSelected.itemID === wallet.id
                : toSelected.type === 'wallet'
                && toSelected.itemID === wallet.id
            }
            onClick={() => onClickItem('wallet', wallet.id, direction)}
          />
        ))}
        {wallets
        && <ItemOperation type='new' onClick={onClickNewWallet} text='Счёт'/>}
      </>
    )
  }
}
