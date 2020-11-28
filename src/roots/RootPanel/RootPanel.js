import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {Panel, View} from '@vkontakte/vkui'
import {HeaderPanel} from '@/components/Navigation/HeaderPanel/HeaderPanel'
import {prevPage} from '@/store/actions/appActions'
import classes from './RootPanel.module.sass'


export const RootPanel = ({children, header = null, centered, fixed}) => {
  const dispatch = useDispatch()
  const onSwipeBack = () => dispatch(prevPage())

  return (
    <View activePanel="main" onSwipeBack={onSwipeBack}>
      <Panel id="main" centered={centered} className={fixed && classes.fixed}>
        {header && (
          <HeaderPanel
            back={header.back}
            btnShare={header.btnShare}
            separator={header.separator}
          >
            {header.content}
          </HeaderPanel>
        )}
        {children}
      </Panel>
    </View>
  )
}

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
