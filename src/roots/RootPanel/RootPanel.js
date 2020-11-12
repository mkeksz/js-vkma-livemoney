import React from 'react'
import PropTypes from 'prop-types'
import {Panel, View} from '@vkontakte/vkui'
import {HeaderPanel} from '@/components/Navigation/HeaderPanel/HeaderPanel'
import classes from './RootPanel.module.sass'


export const RootPanel = ({children, header = null, centered, fixed}) => (
  <View activePanel="main">
    <Panel id="main" centered={centered} className={fixed && classes.fixed}>
      {header && (
        <HeaderPanel back={header.back} separator={header.separator}>
          {header.content}
        </HeaderPanel>
      )}
      {children}
    </Panel>
  </View>
)

RootPanel.propTypes = {
  centered: PropTypes.bool,
  fixed: PropTypes.bool,
  children: PropTypes.any,
  header: PropTypes.shape({
    separator: PropTypes.bool,
    content: PropTypes.any,
    back: PropTypes.bool
  })
}
