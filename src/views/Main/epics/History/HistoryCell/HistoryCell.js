import React, {useMemo} from 'react'
import {useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import {Caption, Card, SimpleCell} from '@vkontakte/vkui'
import {IconCircle} from '../../../../../components/UI/IconCircle/IconCircle'
import {currencyFilter} from '../../../../../filters/numbersFilter'
import classes from './HistoryCell.module.sass'
import store from '../../../../../store/store'
import {getColorCategory} from '../../../../../shared'
import {nextPage} from '../../../../../store/actions/appActions'
import {PAGES} from '../../../../../constants/constants'
import {setPageOptions} from '../../../../../store/actions/pagesActions'

function getItem(typeOperation, objOperation) {
  const obj = objOperation
  const {wallets, categories} = store.getState()

  if (obj.type === 'wallet') return wallets.find(w => w.id === obj.itemID)
  else return categories[typeOperation].find(c => c.id === obj.itemID)
}

export const HistoryCell = ({operation}) => {
  const dispatch = useDispatch()

  const fromItem = useMemo(() => getItem(operation.type, operation.from),
      [operation.from, operation.type])
  const toItem = useMemo(() => getItem(operation.type, operation.to),
      [operation.to, operation.type])

  let colorIcon = null
  if (operation.type === 'expense' && toItem.budget) {
    colorIcon = getColorCategory(toItem.amount, toItem.budget)
  }

  const onClick = () => {
    dispatch(setPageOptions(PAGES.OPERATION, {
      id: operation.id,
      fromSelected: operation.from,
      toSelected: operation.to,
      amount: operation.amount,
      description: operation.description,
      type: operation.type === 'transfer' ? 'expense' : operation.type
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
            type={operation.type === 'transfer' ? 'wallet' : 'category'}
            styles={operation.type === 'transfer' ? fromItem.styles : null}
            icon={operation.type === 'expense' ? toItem.icon : fromItem.icon}
            color={colorIcon}
          />
        }
        after={
          <Caption
            level="1"
            weight="semibold"
            className={
              operation.type === 'income' && classes.captionAmount__green
            }
          >
            {
              (operation.type === 'expense' && '-')
              || (operation.type === 'income' && '+')
            }
            {currencyFilter(operation.amount)}
          </Caption>
        }
      >
        <Caption level="1" weight="semibold" className={classes.captionTitle}>
          {fromItem.title}
          <span> ❯ </span>
          {toItem.title || 'Общее'}
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
