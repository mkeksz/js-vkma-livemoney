import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {Group, Header} from '@vkontakte/vkui'
import {PAGES} from '@/constants/constants'
import {DIRECTION as D} from '../operation.constants'
import {ListItems} from './ListItems/ListItems'
import {useTypes} from './fromTo.hooks'


export const FromTo = ({anchorTo}) => {
  const {operation} = useSelector(({pages}) => pages[PAGES.OPERATION])

  const type = useTypes(operation.type)

  return (
    <>
      <Group header={<Header>Откуда</Header>}>
        <ListItems type={type.from} direction={D.FROM}/>
      </Group>

      <div ref={anchorTo}/>
      <Group header={<Header>Куда</Header>}>
        <ListItems type={type.to} direction={D.TO}/>
      </Group>
    </>
  )
}

FromTo.propTypes = {
  anchorTo: PropTypes.object.isRequired
}
