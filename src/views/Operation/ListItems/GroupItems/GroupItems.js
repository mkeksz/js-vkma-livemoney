import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {PAGES, TYPES_CATEGORY} from '@/constants/constants'
import {ItemOperation} from './ItemOperation/ItemOperation'
import {clearPageOptions, setPageOptions} from '@/store/actions/pagesActions'
import {nextPage} from '@/store/actions/appActions'
import {DIRECTION} from '@/views/Operation/operation.constants'


export const GroupItems = ({type = null, direction, nextAnchor}) => {
  const dispatch = useDispatch()
  const [wallets, categories] = useSelector(({wallets, categories}) =>
    [wallets, categories[type]])
  const {operation} = useSelector(({pages}) => pages[PAGES.OPERATION])

  const items = type ? categories : wallets
  const typeItem = type ? 'category' : 'wallet'


  const onClickNewWallet = () => {
    dispatch(clearPageOptions(PAGES.WALLET))
    dispatch(nextPage({view: PAGES.WALLET}))
  }
  const onClickNewCategory = () => {
    dispatch(clearPageOptions(PAGES.CATEGORY))
    dispatch(setPageOptions(PAGES.CATEGORY, {type}))
    dispatch(nextPage({view: PAGES.CATEGORY}))
  }
  const onClickItem = (id) => {
    if (direction === DIRECTION.FROM) {
      dispatch(setPageOptions(PAGES.OPERATION, {
        operation: {...operation, from: {type: typeItem, itemID: id}}
      }))
    } else {
      dispatch(setPageOptions(PAGES.OPERATION, {
        operation: {...operation, to: {type: typeItem, itemID: id}}
      }))
    }
    nextAnchor()
  }


  return (
    <>
      {items.map(item => (
        <ItemOperation
          key={item.id}
          item={item}
          text={item.title}
          type={typeItem}
          checked={
            operation[direction]
            && operation[direction].itemID === item.id
            && operation[direction].type === typeItem
          }
          onClick={() => onClickItem(item.id)}
        />
      ))}
      <ItemOperation
        type='new'
        text={type ? 'Категория' : 'Счёт'}
        onClick={type ? onClickNewCategory : onClickNewWallet}
      />
    </>
  )
}

GroupItems.propTypes = {
  type: PropTypes.oneOf([
    TYPES_CATEGORY.EXPENSE,
    TYPES_CATEGORY.INCOME,
    null
  ]),
  direction: PropTypes.oneOf([DIRECTION.FROM, DIRECTION.TO]),
  nextAnchor: PropTypes.func.isRequired
}
