import React, {useRef, useEffect, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Div, Group, Header, Input, Panel, View} from '@vkontakte/vkui'
import HorizontalCalendar from 'vkui-horizontal-calendar'
import {
  MAX_LENGTH_DESCRIPTION_CATEGORY, MAX_LENGTH_INPUT_BALANCE, PAGES,
  TYPES_OPERATION
} from '@/constants/constants'
import {DIRECTION} from './operation.constants'
import {HeaderPanel} from '@/components/Navigation/HeaderPanel/HeaderPanel'
import {ButtonDelete} from '@/components/UI/ButtonDelete/ButtonDelete'
import {ButtonSave} from '@/components/UI/ButtonSave/ButtonSave'
import {ListItems} from './ListItems/ListItems'
import {setPageOptions} from '@/store/actions/pagesActions'
import {inputBalanceFilter} from '@/filters/numbersFilter'
import {del, save} from './operation.functions'
import {PopoutAlert} from '@/components/UI/PopoutAlert/PopoutAlert'
import {nextPage} from '@/store/actions/appActions'
import {scrollToAnchor} from '@/shared'


const MAX_CHOOSED_DAY = 7

export const Operation = () => {
  const dispatch = useDispatch()

  const {operation, initialOperation, choosedDate} = useSelector(({pages}) =>
    pages[PAGES.OPERATION])

  const isEdit = !!operation.id

  if (!operation.date) operation.date = new Date()
  else operation.date = new Date(operation.date)

  let difDates = Math.ceil(Math.abs(
      operation.date.getTime()- new Date().getTime()
  ) / (1000 * 3600 * 24)) - 1
  if (difDates >= 3) difDates = 3

  useEffect(() => {
    if (isEdit) {
      dispatch(setPageOptions(PAGES.OPERATION, {
        choosedDate: 7 - difDates
      }))
    }
  }, [isEdit, dispatch])

  const dateCalendar = useMemo(() => {
    const _date = new Date(operation.date)
    const correctDay = isEdit ? 6 - difDates : 6
    _date.setDate(_date.getDate() - correctDay)
    return _date
  }, [])

  const title = operation.type === TYPES_OPERATION.EXPENSE ? 'Расход' : 'Доход'
  const typeFrom = operation.type === TYPES_OPERATION.INCOME
    || operation.type === TYPES_OPERATION.TRANSFER
    ? TYPES_OPERATION.INCOME
    : null
  const typeTo = operation.type === TYPES_OPERATION.EXPENSE
    ? TYPES_OPERATION.EXPENSE
    : null

  const anchorTo = useRef(null)
  const anchorAmount = useRef(null)
  const inputAmount = useRef(null)

  const onChangeAmount = ({currentTarget}) =>
    dispatch(setPageOptions(PAGES.OPERATION, {
      operation: {...operation, amount: inputBalanceFilter(currentTarget.value)}
    }))
  const onChangeDescription = ({currentTarget}) =>
    dispatch(setPageOptions(PAGES.OPERATION, {
      operation: {...operation, description: currentTarget.value}
    }))
  const onDelete = () => {
    dispatch(nextPage({popout: (
      <PopoutAlert
        title='Удалить операцию?'
        button={{title: 'Удалить', action: () => del(initialOperation.id)}}
      >
          Операцию нельзя будет восстановить.
      </PopoutAlert>
    )}))
  }
  const onSave = () => {
    operation.date.setDate(operation.date.getDate() + choosedDate
      - MAX_CHOOSED_DAY + difDates)
    save({
      ...operation,
      id: operation.id || null,
      amount: +operation.amount.toString().replace(',', '.'),
      type: operation.from.type === 'wallet' && operation.to.type === 'wallet'
        ? 'transfer'
        : operation.type,
      description: operation.description || '',
      date: operation.date.toISOString()
    }, initialOperation)
  }
  const nextAnchor = () => {
    if (!operation.to) scrollToAnchor(anchorTo)
    else if (!operation.amount) {
      scrollToAnchor(anchorAmount)
      setTimeout(() => inputAmount.current['focus'](), 300)
    }
  }
  const onClickDate = ({dayNumber}) =>
    dispatch(setPageOptions(PAGES.OPERATION, {choosedDate: dayNumber}))


  return (
    <View activePanel="main">
      <Panel id="main">
        <HeaderPanel buttonBack={true}>{title}</HeaderPanel>

        <Group header={<Header>Откуда</Header>}>
          <ListItems
            type={typeFrom}
            direction={DIRECTION.FROM}
            nextAnchor={nextAnchor}
          />
        </Group>

        <div ref={anchorTo}>
          <Group header={<Header>Куда</Header>}>
            <ListItems
              type={typeTo}
              direction={DIRECTION.TO}
              nextAnchor={nextAnchor}
            />
          </Group>
        </div>

        <Group header={<Header>Дата</Header>}>
          <HorizontalCalendar
            date={dateCalendar}
            choosed={choosedDate}
            isDarkWeekend={false}
            onClick={onClickDate}
          />
        </Group>

        <div ref={anchorAmount}>
          <Group header={<Header>Сумма</Header>}>
            <Div>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="Введите сумму"
                maxLength={MAX_LENGTH_INPUT_BALANCE}
                value={operation.amount || ''}
                onChange={onChangeAmount}
                getRef={inputAmount}
              />
            </Div>
          </Group>
        </div>

        <Group header={<Header>Комментарий (необязательно)</Header>}>
          <Div>
            <Input
              type="text"
              inputMode="text"
              placeholder="Введите комментарий"
              maxLength={MAX_LENGTH_DESCRIPTION_CATEGORY}
              value={operation.description || ''}
              onChange={onChangeDescription}
            />
          </Div>
        </Group>

        {isEdit && <ButtonDelete onClick={onDelete}/>}
        <ButtonSave
          onClick={onSave}
          disabled={
            !operation.amount
            || +operation.amount.toString().replace(',', '.') <= 0
            || !operation.from
            || !operation.to
          }
        />
      </Panel>
    </View>
  )
}
