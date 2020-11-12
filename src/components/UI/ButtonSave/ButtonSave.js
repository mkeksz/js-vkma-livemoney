import React from 'react'
import PropTypes from 'prop-types'
import {Button, Div} from '@vkontakte/vkui'


export const ButtonSave = ({onClick, disabled = false}) => {
  return (
    <Div style={{paddingTop: '20px', paddingBottom: '25px'}}>
      <Button size="xl" mode="commerce" disabled={disabled} onClick={onClick}>
        СОХРАНИТЬ
      </Button>
    </Div>
  )
}

ButtonSave.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}
