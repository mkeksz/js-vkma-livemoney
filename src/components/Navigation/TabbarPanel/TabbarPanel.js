import React from 'react'
import {useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import {Tabbar, TabbarItem} from '@vkontakte/vkui'
import {nextPage} from '../../../store/actions/appActions'

export const TabbarPanel = ({activeStory, items}) => {
  const dispatch = useDispatch()

  const clickHandler = (id) => dispatch(nextPage('main', id))

  return (
    <Tabbar shadow={true}>
      {items.map(item => (
        <TabbarItem
          key={item.id}
          selected={activeStory === item.id}
          text={item.text || ''}
          onClick={() => clickHandler(item.id)}
        >
          {item.icon}
        </TabbarItem>
      ))}
    </Tabbar>
  )
}

TabbarPanel.propTypes = {
  activeStory: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
}
