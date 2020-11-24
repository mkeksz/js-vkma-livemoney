import React, {useRef} from 'react'
import {useSelector as useSelect} from 'react-redux'
import {PAGES as P} from '@/constants/constants'
import {ButtonDelete} from '@/components/UI/ButtonDelete/ButtonDelete'
import {ButtonSave} from '@/components/UI/ButtonSave/ButtonSave'
import {RootPanel} from '@/roots/RootPanel/RootPanel'
import {del, getTitle, isSave, save} from './operation.functions'
import {DateSelect} from './DateSelect/DateSelect'
import {FromTo} from './FromTo/FromTo'
import {InputAmount} from './InputAmount/InputAmount'
import {InputDescription} from './InputDescription/InputDescription'
import {useCorrectChoosedDate, useDifDates, useScroll} from './operation.hooks'


export const Operation = () => {
  const {operation, initOperation} = useSelect(({pages}) => pages[P.OPERATION])

  const isEdit = !!operation.id

  const difDates = useDifDates(operation.date)
  if (isEdit) useCorrectChoosedDate(difDates)

  const anchors = {
    to: useRef(null),
    amount: useRef(null),
    amountInput: useRef(null)
  }
  useScroll(anchors)

  const onDelete = () => del(initOperation.id)
  const onSave = () => save(operation, difDates)

  return (
    <RootPanel header={{back: true, content: getTitle(operation.type)}}>
      <FromTo anchors={anchors}/>

      <DateSelect/>

      <div ref={anchors.amount}/>
      <InputAmount refAmount={anchors.amountInput}/>

      <InputDescription/>

      {isEdit && <ButtonDelete onClick={onDelete}/>}
      <ButtonSave onClick={onSave} disabled={!isSave(operation)}/>
    </RootPanel>
  )
}
