import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {Alert} from '@vkontakte/vkui'
import {setPopout} from '@/store/actions/appActions'


export const PopoutAlert = ({button, title, children}) => {
  const dispatch = useDispatch()

  const onClose = () => dispatch(setPopout(null))

  const actions = [
    {
      title: button.title,
      autoclose: true,
      mode: 'destructive',
      action: button.action
    },
    {
      title: 'Отмена',
      autoclose: true,
      mode: 'cancel'
    }
  ]

  return (
    <Alert actionsLayout="vertical" actions={actions} onClose={onClose}>
      <h2>{title}</h2>
      <p>{children}</p>
    </Alert>
  )
}

PopoutAlert.propTypes = {
  button: PropTypes.shape({
    title: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  }).isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.any
}
