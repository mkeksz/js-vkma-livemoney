import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {Group, Header, Tooltip} from '@vkontakte/vkui'
import {PAGES} from '@/constants/constants'
import {DIRECTION as D} from '../operation.constants'
import {ListItems} from './ListItems/ListItems'
import {useTypes} from './fromTo.hooks'


export const FromTo = ({anchors, tooltips}) => {
  const {operation} = useSelector(({pages}) => pages[PAGES.OPERATION])

  const type = useTypes(operation.type)

  return (
    <>
      <Group header={<Header>Откуда</Header>}>
        <ListItems type={type.from} direction={D.FROM} anchors={anchors}/>
      </Group>
      <Tooltip
        text='Выбери откуда поступает сумма'
        isShown={tooltips.from.show}
        onClose={tooltips.from.on}
        offsetY={-20}
        offsetX={20}
      ><div/></Tooltip>
      <div ref={anchors.to}/>
      <Tooltip
        text='Выбери куда она поступит'
        isShown={tooltips.to.show}
        onClose={tooltips.to.on}
        alignY='top'
        offsetX={20}
        offsetY={-30}
      ><div/></Tooltip>
      <Group header={<Header>Куда</Header>}>
        <ListItems type={type.to} direction={D.TO} anchors={anchors}/>
      </Group>
    </>
  )
}

FromTo.propTypes = {
  anchors: PropTypes.object.isRequired,
  tooltips: PropTypes.object
}
