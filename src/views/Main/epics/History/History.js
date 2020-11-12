import React, {memo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {areEqual} from 'react-window'
import {VariableSizeList as List} from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import {Panel, View, IOS, usePlatform, Placeholder, Button
} from '@vkontakte/vkui'
import {Icon56EventOutline} from '@vkontakte/icons'
import {PAGES} from '@/constants/constants'
import {HeaderPanel} from '@/components/Navigation/HeaderPanel/HeaderPanel'
import {Row} from './Row/Row'
import {formatDateToStringDate} from '@/core/utils'
import {nextPage} from '@/store/actions/appActions'
import classes from './History.module.sass'


export const History = () => {
  const dispatch = useDispatch()

  const platform = usePlatform()
  const operations = useSelector(({operations}) => operations)
  const row = memo(Row, areEqual)

  const getItemSize = index =>
    hasHeaderGroup(operations[index], operations[index - 1]) ? 120 : 75

  const onClickPlaceholder = () => dispatch(nextPage({epic: PAGES.WALLETS}))


  return (
    <View activePanel="main">
      <Panel id="main">
        <HeaderPanel separator={false}>История</HeaderPanel>
        <div
          className={
            `${classes.autoSizer} ${platform === IOS && classes.autoSizerIos}`
          }
        >
          {operations.length > 0 ? (
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
          ) : (
            <Placeholder stretched icon={<Icon56EventOutline/>}>
              <div>У Вас пока нет ни одной операции</div>
              <br/>
              <Button size="l" onClick={onClickPlaceholder}>
                Перейти в кошелёк
              </Button>
            </Placeholder>
          )}
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
