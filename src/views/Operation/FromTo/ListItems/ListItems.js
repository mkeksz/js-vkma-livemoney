import React from 'react'
import PropTypes from 'prop-types'
import {Div} from '@vkontakte/vkui'
import {TYPES_CATEGORY} from '@/constants/constants'
import {DIRECTION} from '@/views/Operation/operation.constants'
import {GroupItems} from './GroupItems/GroupItems'
import classes from './ListItems.module.sass'

export const ListItems = ({type, direction, anchors}) => {
  return (
    <Div className={classes.ListItems}>
      {type && (
        <GroupItems type={type} direction={direction} anchors={anchors}/>
      )}
      <GroupItems direction={direction} anchors={anchors}/>
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
  anchors: PropTypes.object.isRequired
}
