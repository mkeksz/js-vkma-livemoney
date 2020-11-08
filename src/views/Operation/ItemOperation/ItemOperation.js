import React from 'react'
import PropTypes from 'prop-types'
import {Caption} from '@vkontakte/vkui'
import {ICONS} from '../../../constants/constants'
import classes from './ItemOperation.module.sass'
import {IconCircle} from '../../../components/UI/IconCircle/IconCircle'
import {getColorCategory} from '../../../shared'

export const ItemOperation = ({type = 'category', text, item}) => {
  let colorIcon = null

  if (type === 'category' && item.budget) {
    colorIcon = getColorCategory(item.amount, item.budget)
  }


  return (
    <div className={classes.ItemOperation}>
      <IconCircle
        icon={type === 'new' ? ICONS.PLUS : item.icon}
        type={type}
        color={colorIcon}
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
    </div>
  )
}

ItemOperation.propTypes = {
  type: PropTypes.oneOf(['new', 'wallet', 'category']),
  text: PropTypes.string,
  item: PropTypes.object
}
