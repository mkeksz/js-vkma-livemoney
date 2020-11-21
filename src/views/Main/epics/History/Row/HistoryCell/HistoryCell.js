import React from 'react'
import PropTypes from 'prop-types'
import {Caption, Card, SimpleCell} from '@vkontakte/vkui'
import {TYPES_OPERATION as TO} from '@/constants/constants'
import {IconCircle} from '@/components/UI/IconCircle/IconCircle'
import {getColorCategory} from '@/shared/categories'
import {Content} from './Content/Content'
import {useAmount, useIcon, useItem} from './historyCell.hooks'
import {click} from './historyCell.functions'
import classes from './HistoryCell.module.sass'


export const HistoryCell = ({operation}) => {
  const fromItem = useItem(operation, 'from')
  const toItem = useItem(operation, 'to')
  const amount = useAmount(operation)
  const icon = useIcon(operation)

  const color = getColorCategory(toItem)

  const type = operation.type === TO.TRANSFER ? 'wallet' : 'category'
  const styles = operation.type === TO.TRANSFER ? fromItem.styles : null
  const cls = operation.type === TO.INCOME && classes.captionAmount__green

  const clsH = [classes.History]
  if (operation.disabled) clsH.push(classes.History_disabled)

  const onClick = () => operation.disabled ? null : click(operation)

  return (
    <Card size="l" mode="shadow" className={clsH.join(' ')} onClick={onClick}>
      <SimpleCell
        disabled={operation.disabled || false}
        className={classes.cell}
        before={
          <IconCircle type={type} styles={styles} icon={icon} color={color}/>
        }
        after={
          <Caption level="1" weight="semibold" className={cls}>
            {amount}
          </Caption>
        }
      >
        <Content operation={operation}/>
      </SimpleCell>
    </Card>
  )
}

HistoryCell.propTypes = {
  operation: PropTypes.object.isRequired
}
