import React from 'react'
import {useSelector} from 'react-redux'
import {Panel, View} from '@vkontakte/vkui'
import {
  HeaderPanel
} from '../../../../components/Navigation/HeaderPanel/HeaderPanel'
import {HistoryCell} from './HistoryCell/HistoryCell'
import {formatDateToStringDate} from '../../../../core/utils'
import {HeaderDate} from './HeaderDate/HeaderDate'

export const History = () => {
  const operations = useSelector(({operations}) => operations)

  return (
    <View activePanel="main">
      <Panel id="main">
        <HeaderPanel>История</HeaderPanel>
        {renderOperations(operations)}
      </Panel>
    </View>
  )
}

function renderOperations(operations) {
  return operations.map((operation, i) => {
    const [date, stringDate] = getFormatDate(operation.date)

    const cell = <HistoryCell key={operation.id} operation={operation}/>

    if (operations[i - 1]) {
      const [prevDate, prevStringDate] = getFormatDate(operations[i - 1].date)

      if (prevStringDate !== stringDate) {
        return renderOperationWidthHeader(prevDate, cell, operations[i - 1].id)
      }
    } else return renderOperationWidthHeader(date, cell, operation.id)

    return cell
  })
}

function renderOperationWidthHeader(date, cell, key) {
  return (
    <React.Fragment key={key}>
      <HeaderDate date={date}/>
      {cell}
    </React.Fragment>
  )
}

function getFormatDate(date) {
  return [new Date(date), formatDateToStringDate(date)]
}
