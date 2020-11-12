import React, {useMemo} from 'react'
import {useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import {Caption, Card, SimpleCell} from '@vkontakte/vkui'
import {ICONS, PAGES, TYPES_OPERATION} from '@/constants/constants'
import {IconCircle} from '@/components/UI/IconCircle/IconCircle'
import {currencyFilter} from '@/filters/numbersFilter'
import {getColorCategory} from '@/shared'
import {nextPage} from '@/store/actions/appActions'
import {setPageOptions} from '@/store/actions/pagesActions'
import store from '@/store/store'
import classes from './HistoryCell.module.sass'


function getItem(typeOperation, objOperation) {
  const obj = objOperation
  const {wallets, categories} = store.getState()

  if (obj.type === 'wallet') return wallets.find(w => w.id === obj.itemID)
  else return categories[typeOperation].find(c => c.id === obj.itemID)
}

export const HistoryCell = ({operation}) => {
  const dispatch = useDispatch()

  const fromItem = useMemo(() => getItem(operation.type, operation.from) || {},
      [operation.from, operation.type])
  const toItem = useMemo(() => getItem(operation.type, operation.to) || {},
      [operation.to, operation.type])

  let colorIcon = null
  if (operation.type === TYPES_OPERATION.EXPENSE && toItem.budget) {
    colorIcon = getColorCategory(toItem.amount, toItem.budget)
  }

  let icon = operation.type === TYPES_OPERATION.EXPENSE
    ? toItem.icon
    : fromItem.icon
  if (!icon) {
    operation.type === TYPES_OPERATION.TRANSFER
      ? icon = ICONS.WALLET
      : icon = ICONS.RUBLE_SIGN
  }

  const fromPlaceholder = operation.from.type === 'wallet'
    ? 'Кошелёк'
    : 'Доход'
  const toPlaceholder = operation.to.type === 'wallet'
    ? 'Кошелёк'
    : 'Расход'

  const onClick = () => {
    dispatch(setPageOptions(PAGES.OPERATION, {
      operation,
      initialOperation: operation
    }))
    dispatch(nextPage({view: PAGES.OPERATION}))
  }


  return (
    <Card
      size="l"
      mode="shadow"
      className={classes.HistoryCell}
      onClick={onClick}
    >
      <SimpleCell
        className={classes.cell}
        before={
          <IconCircle
            type={
              operation.type === TYPES_OPERATION.TRANSFER
                ? 'wallet'
                : 'category'
            }
            styles={
              operation.type === TYPES_OPERATION.TRANSFER
                ? fromItem.styles
                : null
            }
            icon={icon}
            color={colorIcon}
          />
        }
        after={
          <Caption
            level="1"
            weight="semibold"
            className={
              operation.type === TYPES_OPERATION.INCOME
              && classes.captionAmount__green
            }
          >
            {
              (operation.type === TYPES_OPERATION.EXPENSE && '-')
              || (operation.type === TYPES_OPERATION.INCOME && '+')
            }
            {currencyFilter(operation.amount)}
          </Caption>
        }
      >
        <Caption level="1" weight="semibold" className={classes.captionTitle}>
          {fromItem.title || fromPlaceholder}
          <span> ❯ </span>
          {toItem.title || toPlaceholder}
        </Caption>
        {
          operation.description && (
            <Caption
              level="2"
              weight="regular"
              className={classes.captionDescription}
            >
              {operation.description}
            </Caption>
          )
        }
      </SimpleCell>
    </Card>
  )
}

HistoryCell.propTypes = {
  operation: PropTypes.object.isRequired
}
