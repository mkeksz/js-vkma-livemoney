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
import {useCorrectChoosedDate, useDifDates} from './operation.hooks'


export const Operation = () => {
  const {operation, initOperation} = useSelect(({pages}) => pages[P.OPERATION])

  const isEdit = !!operation.id

  const difDates = useDifDates(operation.date)
  if (isEdit) useCorrectChoosedDate(difDates)

  const refAmount = useRef(null)
  const anchors = {to: useRef(null), amount: useRef(null)}

  const onDelete = () => del(initOperation.id)
  const onSave = () => save(operation, initOperation, difDates)

  return (
    <RootPanel header={{back: true, content: getTitle(operation.type)}}>
      <FromTo anchorTo={anchors.to}/>

      <DateSelect/>

      <div ref={refAmount}/>
      <InputAmount refAmount={refAmount}/>

      <InputDescription/>

      {isEdit && <ButtonDelete onClick={onDelete}/>}
      <ButtonSave onClick={onSave} disabled={!isSave(operation)}/>
    </RootPanel>
  )
}
