import React from 'react'
import {MAX_CHOOSED_DAY as MD} from '@/views/Operation/operation.constants'
import {ERRORS, PAGES, TYPES_OPERATION} from '@/constants/constants'
import {stringToNumber as stringToNum} from '@/core/utils/number'
import {PopoutAlert} from '@/components/UI/PopoutAlert/PopoutAlert'
import {deleteOperation, saveOperation as saveOp} from '@/stateManager'
import {toSaveDate} from '@/core/utils/date'
import {prevPage, setPopout} from '@/store/actions/appActions'
import {removeOperation, saveOperation} from '@/store/actions/operationsActions'
import {getMessageError} from '@/filters/errorFilter'
import {PopoutWarn} from '@/components/UI/PopoutWarn/PopoutWarn'
import {getLast} from '@/core/utils/array'
import store from '@/store/store'


const {dispatch, getState} = store

export function save(operation, difDates, initOp) {
  const choosedDate = store.getState().pages[PAGES.OPERATION].choosedDate

  const _op = {...operation}
  _op.date = toSaveDate(_op.date)
  _op.date.setDate(_op.date.getDate() + choosedDate - MD + difDates)

  const _operation = {
    ..._op,
    amount: stringToNum(_op.amount),
    type: getTypeOperation(_op),
    date: _op.date.toISOString(),
    disabled: true
  }
  dispatch(saveOperation(_operation))
  saveOp(_operation).catch(() => {
    const msg = getMessageError(ERRORS.FAILED_FETCH)
    dispatch(setPopout(<PopoutWarn text={msg.text} title={msg.title}/>))
    const lastItem = getLast(getState().operations)
    if (initOp) dispatch(saveOperation({...initOp, disabled: false}))
    else dispatch(removeOperation(lastItem.id))
  })
  dispatch(prevPage())
}

export function del(initOp) {
  const action = () => {
    const rollbackOps = getState().operations
    dispatch(removeOperation(initOp.id))
    deleteOperation(initOp.id).catch(() => {
      const msg = getMessageError(ERRORS.FAILED_FETCH)
      dispatch(setPopout(<PopoutWarn text={msg.text} title={msg.title}/>))
      dispatch(saveOperation(initOp, rollbackOps))
    })
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
  const op = operation

  if (op.from && !op.to) {
    const top = anchors.to.current.offsetTop - fixedHeaderHeight
    window.scrollTo({top, behavior: 'smooth'})
  } else if (op.from && op.to && (!op.amount || op.id)) {
    const top = anchors.amount.current.offsetTop - fixedHeaderHeight
    window.scrollTo({top, behavior: 'smooth'})
    setTimeout(() => {
      try {
        anchors.amountInput.current.focus()
      } catch (e) {
        if (e.name === 'TypeError') return
        throw e
      }
    }, 300)
  }
}
