import React from 'react'
import PropTypes from 'prop-types'
import {Div} from '@vkontakte/vkui'
import {TYPES_CATEGORY} from '@/constants/constants'
import {GroupItems} from './GroupItems/GroupItems'
import classes from './ListItems.module.sass'
import {DIRECTION} from '@/views/Operation/operation.constants'

export const ListItems = ({type = null, direction, nextAnchor}) => {
  return (
    <Div className={classes.ListItems}>
      {type && (
        <GroupItems type={type} direction={direction} nextAnchor={nextAnchor}/>
      )}
      <GroupItems direction={direction} nextAnchor={nextAnchor}/>
    </Div>
  )
}

ListItems.propTypes = {
  type: PropTypes.oneOf([
    TYPES_CATEGORY.EXPENSE,
    TYPES_CATEGORY.INCOME,
    null
  ]),
  direction: PropTypes.oneOf([DIRECTION.FROM, DIRECTION.TO]),
  nextAnchor: PropTypes.func.isRequired
}
