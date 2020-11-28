import React from 'react'
import {MAX_CHOOSED_DAY as MD} from '@/views/Operation/operation.constants'
import {PAGES, TYPES_OPERATION} from '@/constants/constants'
import {stringToNumber as stringToNum} from '@/core/utils/number'
import {PopoutAlert} from '@/components/UI/PopoutAlert/PopoutAlert'
import {deleteOperation, saveOperation as saveOp} from '@/stateManager'
import {toSaveDate} from '@/core/utils/date'
import {prevPage, setPopout} from '@/store/actions/appActions'
import {removeOperation, saveOperation} from '@/store/actions/operationsActions'
import store from '@/store/store'


const {dispatch, getState} = store

export function save(operation, difDates) {
  const choosedDate = store.getState().pages[PAGES.OPERATION].choosedDate

  const _op = {...operation}
  _op.date = toSaveDate(_op.date)
  _op.date.setDate(_op.date.getDate() + choosedDate - MD + difDates)

  const _operation = {
    ..._op,
    amount: stringToNum(_op.amount),
    type: getTypeOperation(_op),
    date: _op.date.toISOString()
  }
  dispatch(saveOperation(_operation))
  saveOp(_operation)
  dispatch(prevPage())
}

export function del(operationID) {
  const action = () => {
    dispatch(removeOperation(operationID))
    deleteOperation(operationID)
    dispatch(prevPage())
  }

  const popout = (
    <PopoutAlert title='Удалить операцию?' button={{title: 'Удалить', action}}>
      Операцию нельзя будет восстановить.
    </PopoutAlert>
  )

  dispatch(setPopout(popout))
}

export function getTitle(type) {
  return type === TYPES_OPERATION.EXPENSE ? 'Расход' : 'Доход'
}

export function isSave(operation) {
  return !!operation.from && !!operation.to && !!stringToNum(operation.amount)
}

export function getTypeOperation(operation) {
  return operation.from.type === 'wallet' && operation.to.type === 'wallet'
    ? 'transfer'
    : operation.type
}

const fixedHeaderHeight = 52
export function nextAnchor(anchors) {
  const operation = getState().pages[PAGES.OPERATION].operation

  try {
    scrollAndFocus(operation, anchors)
  } catch (e) {
    if (e.name === 'TypeError') return
    throw e
  }
}

function scrollAndFocus(operation, anchors) {
  if (operation.from && !operation.to) {
    const top = anchors.to.current.offsetTop - fixedHeaderHeight
    window.scrollTo({top, behavior: 'smooth'})
  } else if (operation.from && operation.to && operation.id) {
    const top = anchors.amount.current.offsetTop - fixedHeaderHeight
    window.scrollTo({top, behavior: 'smooth'})
    setTimeout(() => {
      try {
        anchors.amountInput.current.focus()
      } catch (e) {
        if (e.name === 'TypeError') return
        throw e
      }
    }, 400)
  }
}
