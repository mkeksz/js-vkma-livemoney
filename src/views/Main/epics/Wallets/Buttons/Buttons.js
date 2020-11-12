import React from 'react'
import {useDispatch} from 'react-redux'
import {Button, Div, Group} from '@vkontakte/vkui'
import {PAGES, TYPES_OPERATION} from '@/constants/constants'
import {clearPageOptions, setPageOptions} from '@/store/actions/pagesActions'
import {nextPage} from '@/store/actions/appActions'
import classes from './Buttons.module.sass'

export const Buttons = () => {
  const dispatch = useDispatch()

  const onClickOperation = (type) => {
    dispatch(clearPageOptions(PAGES.OPERATION))
    dispatch(setPageOptions(PAGES.OPERATION, {operation: {type}}))
    dispatch(nextPage({view: PAGES.OPERATION}))
  }

  return (
    <Group className={classes.group}>
      <Div className={classes.Buttons}>
        <Button
          size="l"
          stretched
          mode="outline"
          className={classes.add}
          onClick={() => onClickOperation(TYPES_OPERATION.INCOME)}
        >
          Доход
        </Button>
        <Button
          size="l"
          stretched
          mode="outline"
          className={classes.remove}
          onClick={() => onClickOperation(TYPES_OPERATION.EXPENSE)}
        >
          Расход
        </Button>
      </Div>
    </Group>
  )
}
