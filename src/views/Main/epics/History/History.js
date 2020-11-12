import React, {memo} from 'react'
import {useSelector} from 'react-redux'
import {VariableSizeList} from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import {areEqual} from 'react-window'
import {IOS, usePlatform} from '@vkontakte/vkui'
import {Row} from './Row/Row'
import {RootPanel} from '@/roots/RootPanel/RootPanel'
import {HistoryPlaceholder} from './HistoryPlaceholder/HistoryPlaceholder'
import {hasHeader} from './history.functions'
import classes from './History.module.sass'


export const History = () => {
  const ops = useSelector(({operations}) => operations)

  const platform = usePlatform()
  const row = memo(Row, areEqual)

  const cls = [classes.autoSizer]
  if (platform === IOS) cls.push(classes.autoSizerIos)

  const getItemSize = index => hasHeader(ops[index], ops[index - 1]) ? 120 : 75

  return (
    <RootPanel header={{content: 'История'}} fixed={true}>
      <div className={cls.join(' ')}>
        {ops.length > 0 ? (
          <AutoSizer>
            {({height, width}) => (
              <VariableSizeList
                height={height}
                itemCount={ops.length}
                itemSize={getItemSize}
                width={width}
              >
                {row}
              </VariableSizeList>
            )}
          </AutoSizer>
        ) : <HistoryPlaceholder/>}
      </div>
    </RootPanel>
  )
}
