import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {PanelHeader, PanelHeaderButton} from '@vkontakte/vkui'
import {Icon28SettingsOutline} from '@vkontakte/icons'
import {nextPage} from '../../../store/actions/appActions'

export const HeaderPanel = ({children}) => {
  const dispatch = useDispatch()

  const buttonHandler = () => dispatch(nextPage('settings'))

  return (
    <PanelHeader
      separator={true}
      left={
        <PanelHeaderButton onClick={buttonHandler}>
          <Icon28SettingsOutline />
        </PanelHeaderButton>
      }
    >
      {children}
    </PanelHeader>
  )
}
HeaderPanel.propTypes = {
  children: PropTypes.any
}
