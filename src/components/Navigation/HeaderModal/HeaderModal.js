import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {Icon24Cancel, Icon24Dismiss} from '@vkontakte/icons'
import {ModalPageHeader, PanelHeaderButton, usePlatform, IOS
} from '@vkontakte/vkui'
import {prevPage} from '@/store/actions/appActions'


export const HeaderModal = ({children}) => {
  const dispatch = useDispatch()

  const platform = usePlatform()

  const clickHandler = () => dispatch(prevPage())

  return (
    <ModalPageHeader
      right={
        platform === IOS && (
          <PanelHeaderButton onClick={clickHandler}>
            <Icon24Dismiss />
          </PanelHeaderButton>
        )
      }
      left={
        platform !== IOS && (
          <PanelHeaderButton onClick={clickHandler}>
            <Icon24Cancel />
          </PanelHeaderButton>
        )
      }
    >
      {children}
    </ModalPageHeader>
  )
}

HeaderModal.propTypes = {
  children: PropTypes.any.isRequired
}
