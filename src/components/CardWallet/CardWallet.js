import React from 'react'
import {useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import {Card, Div, Headline, Title} from '@vkontakte/vkui'
import {Icon24Write, Icon56AddCircleOutline} from '@vkontakte/icons'
import classes from './CardWallet.module.sass'
import {Icon} from '../UI/Icon/Icon'
import {nextPage} from '../../store/actions/appActions'
import {PAGES} from '../../constants/constants'
import {
  clearPageOptions,
  setPageOptions
} from '../../store/actions/pagesActions'

export const CardWallet = ({type = 'wallet', styles = {}, options = {}}) => {
  const dispatch = useDispatch()

  const isShared = type === 'shared'
  const isNew = type === 'new'
  const showRealBalance = isShared && options.visibleRealBalance

  const cls = [classes.CardWallet]
  if (isShared) cls.push(classes.shared)
  else if (isNew) cls.push(classes.new)

  const editHandler = (walletID) => {
    dispatch(setPageOptions(PAGES.WALLET, {id: walletID}))
    dispatch(nextPage(PAGES.WALLET))
  }
  const newHandler = () => {
    dispatch(clearPageOptions(PAGES.WALLET))
    dispatch(nextPage(PAGES.WALLET))
  }

  return (
    <Card
      className={cls.join(' ')}
      style={styles}
      onClick={isNew ? newHandler : ()=>{}}
    >
      <Div className={classes.container}>
        {!isNew ? (
          <div className={classes.header}>
            <div className={classes.icon}>
              {options.icon && <Icon icon={options.icon}/>}
            </div>
            <Title
              level="3"
              weight="medium"
              className={classes.title}
              style={{color: styles.color}}
            >{options.title}</Title>
            {
              !isShared &&
              <div className={`${classes.icon} ${classes.edit}`}>
                <Icon24Write
                  width={27}
                  height={27}
                  style={{color: styles.color}}
                  onClick={() => editHandler(options.id)}
                />
              </div>
            }
          </div>
        ) : <div/>}
        <div className={classes.balance}>
          {
            isNew ?
            <Icon56AddCircleOutline width={100} height={100} /> :
            <Title weight="bold" level="1">
              {options.balance} ₽
            </Title>
          }
          {
            showRealBalance &&
              <Headline weight="regular">
                {options.realBalance} ₽
              </Headline>
          }
        </div>
      </Div>
    </Card>
  )
}

CardWallet.propTypes = {
  styles: PropTypes.shape({
    backgroundColor: PropTypes.string,
    color: PropTypes.string
  }),
  options: PropTypes.shape({
    title: PropTypes.string,
    balance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    realBalance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    icon: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    }),
    visibleRealBalance: PropTypes.bool,
    id: PropTypes.number
  }),
  type: PropTypes.oneOf(['new', 'shared', 'wallet'])
}
