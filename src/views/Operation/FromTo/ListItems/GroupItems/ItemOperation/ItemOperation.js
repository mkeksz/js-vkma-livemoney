import React from 'react'
import PropTypes from 'prop-types'
import {Caption} from '@vkontakte/vkui'
import {ICONS} from '@/constants/constants'
import {getColorCategory} from '@/shared/categories'
import {IconCircle} from '@/components/UI/IconCircle/IconCircle'
import {Icon} from '@/components/UI/Icon/Icon'
import classes from './ItemOperation.module.sass'


export const ItemOperation = ({type, text, item, onClick, checked}) => {
  if (!item) item = {}

  const cls = [classes.ItemOperation]
  if (item.disabled) cls.push(classes.ItemOperation_disabled)

  const onClck = () => !item.disabled && onClick()

  return (
    <div className={cls.join(' ')} onClick={onClck}>
      <IconCircle
        icon={type === 'new' ? ICONS.PLUS : item.icon}
        type={type}
        color={getColorCategory(item)}
        styles={type === 'wallet' ? item.styles : null}
      />
      <Caption
        level="3"
        weight="regular"
        className={classes.caption}
        style={{color: type === 'new' ? '#3f8ae0' : 'var(--text_primary)'}}
      >
        {text}
      </Caption>
      {checked && (
        <span className={classes.check}><Icon icon={ICONS.CHECK}/></span>
      )}
    </div>
  )
}

ItemOperation.propTypes = {
  type: PropTypes.oneOf(['new', 'wallet', 'category']),
  text: PropTypes.string,
  item: PropTypes.object,
  checked: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}
