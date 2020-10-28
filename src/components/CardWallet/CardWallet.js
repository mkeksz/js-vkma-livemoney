import React from 'react'
import PropTypes from 'prop-types'
import {Card, Div, Headline, Title} from '@vkontakte/vkui'
import {Icon24Write, Icon56AddCircleOutline} from '@vkontakte/icons'
import classes from './CardWallet.module.sass'
import {Icon} from '../UI/Icon/Icon'

export const CardWallet = ({type = 'wallet', styles = {}, options = {}}) => {
  const cls = [classes.CardWallet]

  if (type === 'shared') cls.push(classes.shared)
  else if (type === 'new') cls.push(classes.new)

  return (
    <Card className={cls.join(' ')} style={styles}>
      <Div className={classes.container}>
        {type !== 'new' ? (
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
              type !== 'shared' &&
              <div className={`${classes.icon} ${classes.edit}`}>
                <Icon24Write
                  width={27}
                  height={27}
                  style={{color: styles.color}}
                />
              </div>
            }
          </div>
        ) : <div/>}
        <div className={classes.balance}>
          {
            type === 'new' ?
            <Icon56AddCircleOutline width={100} height={100} /> :
            <Title weight="bold" level="1">
              {options.balance} ₽
            </Title>
          }
          {
            type === 'shared' &&
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
    })
  }),
  type: PropTypes.oneOf(['new', 'shared', 'wallet'])
}
