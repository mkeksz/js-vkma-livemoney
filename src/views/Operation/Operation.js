import React from 'react'
import {Group, Header, Panel, View, Div, Input, Button} from '@vkontakte/vkui'
import {HeaderPanel} from '../../components/Navigation/HeaderPanel/HeaderPanel'
import {useSelector} from 'react-redux'
import {PAGES} from '../../constants/constants'
import classes from './Operation.module.sass'
import {ItemOperation} from './ItemOperation/ItemOperation'

export const Operation = () => {
  const {type} = useSelector(({pages}) => pages[PAGES.OPERATION])
  const {income, expense} = useSelector(({categories}) => categories)
  const wallets = useSelector(({wallets}) => wallets)

  const isEdit = false

  const title = type === 'expense' ? 'Расход' : 'Доход'

  return (
    <View activePanel="main">
      <Panel id="main">
        <HeaderPanel buttonBack={true}>{title}</HeaderPanel>

        <Group header={<Header>Откуда</Header>}>
          <Div className={classes.items}>
            {renderItems(wallets, type === 'expense' ? null : income)}
          </Div>
        </Group>

        <Group header={<Header>Куда</Header>}>
          <Div className={classes.items}>
            {renderItems(wallets, type === 'expense' ? expense : null)}
          </Div>
        </Group>

        <Group header={<Header>Сумма</Header>}>
          <Div>
            <Input
              type="text"
              inputMode="numeric"
              name="sum"
              placeholder="0"
              maxLength="15"
            />
          </Div>
        </Group>

        <Group header={<Header>Комментарий (необязательно)</Header>}>
          <Div>
            <Input
              type="text"
              inputMode="text"
              name="comment"
              placeholder="Введите комментарий"
              maxLength="30"
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
          <Button size="xl" mode="commerce">
            {isEdit ? 'СОХРАНИТЬ' : 'СОЗДАТЬ'}
          </Button>
        </Div>

      </Panel>
    </View>
  )
}

function renderItems(wallets, categories = null) {
  return (
    <>
      {categories && categories.map(category => (
        <ItemOperation
          key={category.id}
          item={category}
          type='category'
          text={category.title}
        />
      ))}
      {categories && <ItemOperation type='new' text='Категория'/>}
      {wallets && wallets.map(wallet => (
        <ItemOperation
          key={wallet.id}
          item={wallet}
          type='wallet'
          text={wallet.title}
        />
      ))}
      {wallets && <ItemOperation type='new' text='Счёт'/>}
    </>
  )
}
