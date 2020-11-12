import React from 'react'
import PropTypes from 'prop-types'
import {Caption} from '@vkontakte/vkui'
import {useItem} from '../historyCell.hooks'
import classes from './Content.module.sass'


export const Content = ({operation}) => {
  const fromItem = useItem(operation, 'from')
  const toItem = useItem(operation, 'to')

  const fromPlaceholder = operation.from.type === 'wallet' ? 'Кошелёк' : 'Доход'
  const toPlaceholder = operation.to.type === 'wallet' ? 'Кошелёк' : 'Расход'

  return (
    <>
      <Caption level="1" weight="semibold" className={classes.captionTitle}>
        {fromItem.title || fromPlaceholder}
        <span> ❯ </span>
        {toItem.title || toPlaceholder}
      </Caption>
      {operation.description && (
        <Caption level="2" weight="regular" className={classes.description}>
          {operation.description}
        </Caption>
      )}
    </>
  )
}

Content.propTypes = {
  operation: PropTypes.object.isRequired
}
