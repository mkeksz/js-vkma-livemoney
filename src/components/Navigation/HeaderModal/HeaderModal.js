import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import {ModalPageHeader, PanelHeaderButton} from '@vkontakte/vkui'
import {Icon24Cancel, Icon24Dismiss} from '@vkontakte/icons'
import {prevPage} from '../../../store/actions/appActions'


export const HeaderModal = ({children}) => {
  const dispatch = useDispatch()

  const platform = useSelector(({app}) => app.platform)

  const clickHandler = () => dispatch(prevPage())


  return (
    <ModalPageHeader
      right={
        platform !== 'android' && (
          <PanelHeaderButton onClick={clickHandler}>
            <Icon24Dismiss />
          </PanelHeaderButton>
        )
      }
      left={
        platform === 'android' && (
          <PanelHeaderButton onClick={clickHandler}>
            <Icon24Cancel />
          </PanelHeaderButton>
        )
      }>
      {children}
    </ModalPageHeader>
  )
}

HeaderModal.propTypes = {
  children: PropTypes.any.isRequired
}
