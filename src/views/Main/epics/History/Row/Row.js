import React from 'react'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import {HistoryCell} from '../HistoryCell/HistoryCell'
import {HeaderDate} from '../HeaderDate/HeaderDate'
import {hasHeaderGroup} from '../History'

export const Row = ({index, style}) => {
  const [operation, prevOperation] = useSelector(({operations}) =>
    [operations[index], operations[index - 1]])

  const hasHeader = hasHeaderGroup(operation, prevOperation)

  return (
    <div style={style}>
      {hasHeader && <HeaderDate date={operation.date}/>}
      <HistoryCell operation={operation}/>
    </div>
  )
}

Row.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object
}
