import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {Alert} from '@vkontakte/vkui'
import {setPopout} from '@/store/actions/appActions'


export const PopoutWarn = ({text, title}) => {
  const dispatch = useDispatch()

  const onClose = () => dispatch(setPopout(null))

  const actions = [
    {
      title: 'Ок',
      autoclose: true,
      mode: 'cancel'
    }
  ]

  return (
    <Alert actionsLayout="vertical" actions={actions} onClose={onClose}>
      {title && (
        <h2 style={{color: 'var(--button_secondary_destructive_foreground)'}}>
          {title}
        </h2>
      )}
      {text && (
        <p>{text}</p>
      )}
    </Alert>
  )
}

PopoutWarn.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string
}
