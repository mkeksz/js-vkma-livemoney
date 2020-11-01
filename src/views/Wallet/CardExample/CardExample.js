import React from 'react'
import PropTypes from 'prop-types'
import {Card, Div, Title} from '@vkontakte/vkui'
import {useDispatch} from 'react-redux'
import classes from './CardExample.module.sass'
import {Icon} from '../../../components/UI/Icon/Icon'
import {currencyFilter} from '../../../filters/numbersFilter'
import {nextPage} from '../../../store/actions/appActions'
import {PAGES} from '../../../constants/constants'
import {setPageOptions} from '../../../store/actions/pagesActions'

export const CardExample = ({wallet, icon}) => {
  const dispatch = useDispatch()

  wallet.balance = wallet.balance.toString().replace(',', '.')

  const clickIconHandler = () => {
    dispatch(setPageOptions(PAGES.MODAL_ICONS, {icon, styles: wallet.styles}))
    dispatch(nextPage(null, null, PAGES.MODAL_ICONS))
  }

  return (
    <Card
      className={classes.CardExample}
      style={{backgroundColor: wallet.styles.backgroundColor}}
    >
      <Div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.icon} onClick={clickIconHandler}>
            <div className={classes.border} style={{borderColor: '#fff'}}/>
            <div className={classes.item} style={{color: wallet.styles.color}}>
              {icon && <Icon icon={icon}/>}
            </div>
          </div>
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
