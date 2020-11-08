import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {PanelHeader, PanelHeaderButton} from '@vkontakte/vkui'
import {Icon28SettingsOutline, Icon24BrowserBack} from '@vkontakte/icons'
import {nextPage, prevPage} from '../../../store/actions/appActions'
import {PAGES} from '../../../constants/constants'

export const HeaderPanel = ({
  children,
  buttonBack = false,
  visor = true,
  transparent = false,
  separator = true
}) => {
  const dispatch = useDispatch()

  const buttonHandler = () => {
    if (buttonBack) dispatch(prevPage())
    else dispatch(nextPage({view: PAGES.SETTINGS}))
  }

  return (
    <PanelHeader
      visor={visor}
      transparent={transparent}
      separator={separator}
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
  buttonBack: PropTypes.bool,
  visor: PropTypes.bool,
  transparent: PropTypes.bool,
  separator: PropTypes.bool
}
