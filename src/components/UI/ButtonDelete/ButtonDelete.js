import React from 'react'
import PropTypes from 'prop-types'
import {Button, Div} from '@vkontakte/vkui'

export const ButtonDelete = ({onClick}) => {
  return (
    <Div style={{paddingTop: '20px'}}>
      <Button size="l" mode="destructive" onClick={onClick}>УДАЛИТЬ</Button>
    </Div>
  )
}

ButtonDelete.propTypes = {
  onClick: PropTypes.func.isRequired
}
