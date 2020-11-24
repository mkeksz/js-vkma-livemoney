import React from 'react'
import {Button, Div, Group} from '@vkontakte/vkui'
import {TYPES_OPERATION} from '@/constants/constants'
import {click} from './buttons.functions'
import classes from './Buttons.module.sass'


export const Buttons = () => {
  const onClickOperation = type => click(type)

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
