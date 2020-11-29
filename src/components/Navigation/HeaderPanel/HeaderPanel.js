import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {PanelHeader, PanelHeaderBack, PanelHeaderButton} from '@vkontakte/vkui'
import {Icon28SettingsOutline, Icon28ShareOutline} from '@vkontakte/icons'
import {click, share} from './headerPanel.functions'
import {getLast} from '@/core/utils/array'


export const HeaderPanel = ({children, back, separator, btnShare}) => {
  const analytics = useSelector(({analytics}) => analytics)
  const amounts = analytics.length > 0 ? getLast(analytics).amounts : []

  const onClickBackSettings = () => click(back)
  const onClickShare = () => share(amounts)

  return (
    <PanelHeader
      visor={true}
      separator={separator || false}
      left={
        <>
          {!back && (
            <PanelHeaderButton onClick={onClickBackSettings}>
              <Icon28SettingsOutline/>
            </PanelHeaderButton>
          )}
          {back && <PanelHeaderBack onClick={onClickBackSettings} />}
          <PanelHeaderButton onClick={onClickShare}>
            {!back && btnShare && <Icon28ShareOutline/>}
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
  separator: PropTypes.bool,
  btnShare: PropTypes.bool
}
