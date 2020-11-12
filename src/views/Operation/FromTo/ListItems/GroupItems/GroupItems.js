import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {PAGES, TYPES_CATEGORY} from '@/constants/constants'
import {DIRECTION} from '@/views/Operation/operation.constants'
import {ItemOperation} from './ItemOperation/ItemOperation'
import {clickItem, clickNew, isChecked} from './groupItems.functions'


export const GroupItems = ({type, direction}) => {
  const wallets = useSelector(({wallets}) => wallets)
  const categories = useSelector(({categories}) => categories[type])
  const {operation} = useSelector(({pages}) => pages[PAGES.OPERATION])

  const items = type ? categories : wallets
  const typeItem = type ? 'category' : 'wallet'
  const textNewItem = type ? 'Категория' : 'Счёт'

  const onClickItem = (id) => clickItem(direction, typeItem, id)
  const onClickNew = () => clickNew(type)

  return (
    <>
      {items.map(item => (
        <ItemOperation
          key={item.id}
          item={item}
          text={item.title}
          type={typeItem}
          checked={isChecked(operation[direction], item, typeItem)}
          onClick={() => onClickItem(item.id)}
        />
      ))}
      <ItemOperation type='new' text={textNewItem} onClick={onClickNew}/>
    </>
  )
}

GroupItems.propTypes = {
  type: PropTypes.oneOf([
    TYPES_CATEGORY.EXPENSE,
    TYPES_CATEGORY.INCOME,
    null
  ]),
  direction: PropTypes.oneOf([DIRECTION.FROM, DIRECTION.TO])
}
