import React from 'react'
import PropTypes from 'prop-types'
import {PanelHeader, PanelHeaderButton} from '@vkontakte/vkui'
import {Icon28SettingsOutline, Icon24BrowserBack, Icon28ShareOutline
} from '@vkontakte/icons'
import {click, share} from './headerPanel.functions'


export const HeaderPanel = ({children, back, separator}) => {
  const onClickBackSettings = () => click(back)
  const onClickShare = () => share()

  return (
    <PanelHeader
      visor={true}
      separator={separator || false}
      left={
        <>
          <PanelHeaderButton onClick={onClickBackSettings}>
            {back ? <Icon24BrowserBack/> : <Icon28SettingsOutline/>}
          </PanelHeaderButton>
          <PanelHeaderButton onClick={onClickShare}>
            {!back && <Icon28ShareOutline/>}
          </PanelHeaderButton>
        </>
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
