import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {HistoryCell} from './HistoryCell/HistoryCell'
import {HeaderDate} from './HeaderDate/HeaderDate'
import {hasHeader} from '../history.functions'


export const Row = ({index, style}) => {
  const [op, prevOp] = useSelector(({operations}) =>
    [operations[index], operations[index - 1]])

  return (
    <div style={style}>
      {hasHeader(op, prevOp) && <HeaderDate date={op.date}/>}
      <HistoryCell operation={op}/>
    </div>
  )
}

Row.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object
}
