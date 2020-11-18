import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Card, Div, Title} from '@vkontakte/vkui'
import {PAGES} from '@/constants/constants'
import {DEFAULT_TITLE} from '../wallet.constants'
import {currencyFilter} from '@/filters/numbersFilter'
import {nextPage, prevPage} from '@/store/actions/appActions'
import {setPageOptions} from '@/store/actions/pagesActions'
import {SelectIcon} from '@/components/UI/SelectIcon/SelectIcon'
import classes from './CardExample.module.sass'


export const CardExample = () => {
  const dispatch = useDispatch()

  const {wallet} = useSelector(({pages}) => pages[PAGES.WALLET])
  const defaultColor = useSelector(({colors}) => colors[0])
  const {color, backgroundColor} = wallet.styles || defaultColor
  const balance = currencyFilter(wallet.balance)

  const onClickIcon = () => {
    dispatch(setPageOptions(PAGES.MODAL_ICONS, {
      icon: wallet.icon,
      styles: wallet.styles || defaultColor,
      onClick: icon => {
        dispatch(setPageOptions(PAGES.WALLET, {wallet: {...wallet, icon}}))
        dispatch(prevPage())
      }
    }))
    dispatch(nextPage({modal: PAGES.MODAL_ICONS}))
  }

  return (
    <Card className={classes.CardExample} style={{backgroundColor}}>
      <Div className={classes.container}>
        <div className={classes.header}>
          <SelectIcon onClick={onClickIcon} icon={wallet.icon} color={color}/>
          <Title
            level="3"
            weight="medium"
            className={classes.title}
            style={{color}}
          >
            {wallet.title || DEFAULT_TITLE}
          </Title>
        </div>
        <div className={classes.balance}>
          <Title weight="bold" level="1" style={{color}}>{balance}</Title>
        </div>
      </Div>
    </Card>
  )
}
