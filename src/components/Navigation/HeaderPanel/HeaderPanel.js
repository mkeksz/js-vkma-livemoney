import React from 'react'
import PropTypes from 'prop-types'
import {PanelHeader, PanelHeaderButton} from '@vkontakte/vkui'
import {Icon28SettingsOutline, Icon24BrowserBack} from '@vkontakte/icons'
import {click} from './headerPanel.functions'


export const HeaderPanel = ({children, back, separator}) => {
  const buttonHandler = () => click(back)

  return (
    <PanelHeader
      visor={true}
      separator={separator || false}
      left={
        <PanelHeaderButton onClick={buttonHandler}>
          {back ? <Icon24BrowserBack/> : <Icon28SettingsOutline/>}
        </PanelHeaderButton>
      }
    >
      {children}
    </PanelHeader>
  )
}

HeaderPanel.propTypes = {
  children: PropTypes.any,
  back: PropTypes.bool,
  visor: PropTypes.bool,
  separator: PropTypes.bool
}
