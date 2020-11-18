import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Group, Header, HorizontalScroll} from '@vkontakte/vkui'
import {PAGES} from '@/constants/constants'
import {CircleColor} from '@/views/Wallet/Colors/CircleColor/CircleColor'
import {setPageOptions} from '@/store/actions/pagesActions'


export const Colors = () => {
  const dispatch = useDispatch()

  const {wallet} = useSelector(({pages}) => pages[PAGES.WALLET])
  const colors = useSelector(({colors}) => colors)
  const styles = wallet.styles || colors[0]

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
