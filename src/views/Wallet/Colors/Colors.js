import React, {useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Group, Header, HorizontalScroll} from '@vkontakte/vkui'
import {COLORS, PAGES} from '@/constants/constants'
import {DEFAULT_COLOR} from '@/views/Wallet/wallet.constants'
import {CircleColor} from '@/views/Wallet/Colors/CircleColor/CircleColor'
import {setPageOptions} from '@/store/actions/pagesActions'


export const Colors = () => {
  const dispatch = useDispatch()

  const {wallet} = useSelector(({pages}) => pages[PAGES.WALLET])
  const colors = useMemo(() => Object.values(COLORS), [])
  const styles = wallet.styles || DEFAULT_COLOR

  const clickColorHandler = (colorID) => {
    const color = colors.find(color => color.id === colorID)
    dispatch(setPageOptions(PAGES.WALLET, {wallet: {...wallet, styles: color}}))
  }

  return (
    <Group header={<Header mode="primary">Оформление</Header>}>
      <HorizontalScroll style={{padding: '0 10px'}}>
        <div style={{display: 'flex'}}>
          {colors.map(color => (
            <CircleColor
              key={color.id}
              color={color}
              onClick={clickColorHandler}
              selected={color.id === styles.id}
            />
          ))}
        </div>
      </HorizontalScroll>
    </Group>
  )
}
