import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {PanelHeader, PanelHeaderButton} from '@vkontakte/vkui'
import {Icon28SettingsOutline, Icon24BrowserBack} from '@vkontakte/icons'
import {nextPage, prevPage} from '../../../store/actions/appActions'
import {PAGES} from '../../../constants/constants'

export const HeaderPanel = ({children, buttonBack = false}) => {
  const dispatch = useDispatch()

  const buttonHandler = () => {
    if (buttonBack) dispatch(prevPage())
    else dispatch(nextPage(PAGES.SETTINGS))
  }

  return (
    <PanelHeader
      separator={true}
      left={
        <PanelHeaderButton onClick={buttonHandler}>
          {buttonBack ? <Icon24BrowserBack/> : <Icon28SettingsOutline/>}
        </PanelHeaderButton>
      }
    >
      {children}
    </PanelHeader>
  )
}

HeaderPanel.propTypes = {
  children: PropTypes.any,
  buttonBack: PropTypes.bool
}
