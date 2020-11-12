import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {Alert} from '@vkontakte/vkui'
import {prevPage} from '@/store/actions/appActions'


export const PopoutWarn = ({text}) => {
  const dispatch = useDispatch()

  const onClose = () => dispatch(prevPage())

  const actions = [
    {
      title: 'Ок',
      autoclose: true,
      mode: 'cancel'
    }
  ]

  return (
    <Alert actionsLayout="vertical" actions={actions} onClose={onClose}>
      <h2 style={{color: 'var(--button_secondary_destructive_foreground)'}}>
        Превышен лимит
      </h2>
      <p>{text}</p>
    </Alert>
  )
}

PopoutWarn.propTypes = {
  text: PropTypes.string
}
