import React from 'react'
import {MAX_CHOOSED_DAY as MD} from '@/views/Operation/operation.constants'
import {PAGES, TYPES_OPERATION} from '@/constants/constants'
import {stringToNumber as stringToNum} from '@/core/utils/number'
import {PopoutAlert} from '@/components/UI/PopoutAlert/PopoutAlert'
import {deleteOperation, saveOperation} from '@/stateManager'
import {toSaveDate} from '@/core/utils/date'
import {hideLoader, prevPage, setPopout, showLoader
} from '@/store/actions/appActions'
import store from '@/store/store'


const {dispatch, getState} = store

export function save(operation, initOperation, difDates) {
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

  dispatch(showLoader())
  saveOperation(_operation, initOperation).then(close)
}

export function del(operationID) {
  const action = () => {
    dispatch(showLoader())
    deleteOperation(operationID).then(close)
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

function close() {
  const isLastPage = getState().app.history.length <= 1
  store.dispatch(hideLoader())
  if (!isLastPage) store.dispatch(prevPage())
}

