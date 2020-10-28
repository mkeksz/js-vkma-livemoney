import React from 'react'
import PropTypes from 'prop-types'
import {Card, Div, Headline, Title} from '@vkontakte/vkui'
import {Icon24Write, Icon56AddCircleOutline} from '@vkontakte/icons'
import classes from './CardWallet.module.sass'

export const CardWallet = ({type = 'wallet', styles = {}, title}) => {
  const cls = [classes.CardWallet]

  if (type === 'shared') cls.push(classes.shared)
  else if (type === 'new') cls.push(classes.new)

  return (
    <Card className={cls.join(' ')} style={styles}>
      <Div className={classes.container}>
        {type !== 'new' ? (
          <div className={classes.header}>
            {
              type !== 'shared' &&
              <div className={classes.icon}>
                <Icon24Write style={{color: styles.color}}/>
              </div>
            }
            <Title
              level="3"
              weight="medium"
              className={classes.title}
              style={{color: styles.color}}
            >{title}</Title>
            {
              type !== 'shared' &&
              <div className={classes.icon}>
                <Icon24Write style={{color: styles.color}}/>
              </div>
            }
          </div>
        ) : <div/>}
        <div className={classes.balance}>
          {
            type === 'new' ?
            <Icon56AddCircleOutline /> :
            <Title weight="bold" level="1">
              1 456,23 ₽
            </Title>
          }
          {
            type === 'shared' &&
              <Headline weight="regular">
                456,23 ₽
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
  type: PropTypes.oneOf(['new', 'shared', 'wallet']),
  title: PropTypes.string
}
