import React, {memo} from 'react'
import {useSelector} from 'react-redux'
import {VariableSizeList as List} from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import {areEqual} from 'react-window'
import {Panel, View, IOS, usePlatform} from '@vkontakte/vkui'
import {
  HeaderPanel
} from '../../../../components/Navigation/HeaderPanel/HeaderPanel'
import {Row} from './Row/Row'
import classes from './History.module.sass'
import {formatDateToStringDate} from '../../../../core/utils'

export const History = () => {
  const platform = usePlatform()
  const operations = useSelector(({operations}) => operations)
  const row = memo(Row, areEqual)

  const getItemSize = index =>
    hasHeaderGroup(operations[index], operations[index - 1]) ? 120 : 75


  return (
    <View activePanel="main">
      <Panel id="main">
        <HeaderPanel separator={false}>История</HeaderPanel>
        <div
          className={
            `${classes.autoSizer} ${platform === IOS && classes.autoSizerIos}`
          }
        >
          <AutoSizer>
            {({height, width}) => (
              <List
                height={height}
                itemCount={operations.length}
                itemSize={getItemSize}
                width={width}
              >
                {row}
              </List>
            )}
          </AutoSizer>
        </div>
      </Panel>
    </View>
  )
}

export function hasHeaderGroup(operation, prevOperation) {
  const stringDate = formatDateToStringDate(operation.date)

  if (prevOperation) {
    const prevStringDate = formatDateToStringDate(prevOperation.date)
    if (prevStringDate !== stringDate) return 'prev'
    return false
  } else return 'current'
}
