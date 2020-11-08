import React from 'react'
import PropTypes from 'prop-types'
import {Card, Div, Title} from '@vkontakte/vkui'
import {useDispatch} from 'react-redux'
import classes from './CardExample.module.sass'
import {currencyFilter} from '../../../filters/numbersFilter'
import {nextPage, prevPage} from '../../../store/actions/appActions'
import {PAGES} from '../../../constants/constants'
import {setPageOptions} from '../../../store/actions/pagesActions'
import {SelectIcon} from '../../../components/UI/SelectIcon/SelectIcon'

export const CardExample = ({wallet, icon}) => {
  const dispatch = useDispatch()

  wallet.balance = wallet.balance.toString().replace(',', '.')

  const onClickIcon = () => {
    dispatch(setPageOptions(PAGES.MODAL_ICONS, {
      icon,
      styles: wallet.styles,
      onClick: (icon) => {
        dispatch(setPageOptions(PAGES.WALLET, {icon}))
        dispatch(prevPage())
      }
    }))
    dispatch(nextPage({modal: PAGES.MODAL_ICONS}))
  }

  return (
    <Card
      className={classes.CardExample}
      style={{backgroundColor: wallet.styles.backgroundColor}}
    >
      <Div className={classes.container}>
        <div className={classes.header}>
          <SelectIcon
            onClick={onClickIcon}
            icon={icon}
            color={wallet.styles.color}
          />
          <Title
            level="3"
            weight="medium"
            className={classes.title}
            style={{color: wallet.styles.color}}
          >
            {wallet.title || 'Новый кошелёк'}
          </Title>
        </div>
        <div className={classes.balance}>
          <Title weight="bold" level="1" style={{color: wallet.styles.color}}>
            {currencyFilter(wallet.balance)}
          </Title>
        </div>
      </Div>
    </Card>
  )
}

CardExample.propTypes = {
  wallet: PropTypes.shape({
    title: PropTypes.string,
    balance: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    styles: PropTypes.object
  }),
  icon: PropTypes.object
}
