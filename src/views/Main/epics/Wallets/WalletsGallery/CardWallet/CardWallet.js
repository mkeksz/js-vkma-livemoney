import React from 'react'
import PropTypes from 'prop-types'
import {Card, Div} from '@vkontakte/vkui'
import {CardWalletHeader} from './CardWalletHeader/CardWalletHeader'
import {CardWalletBalance} from './CardWalletBalance/CardWalletBalance'
import {clickNew} from './cardWallet.functions'
import classes from './CardWallet.module.sass'


export const CardWallet = ({type = 'wallet', styles = {}, options = {}}) => {
  const isShared = type === 'shared'
  const isNew = type === 'new'
  const showRealBalance = isShared && options.visibleRealBalance

  const cls = [classes.CardWallet]
  if (isShared) cls.push(classes.shared)
  else if (isNew) cls.push(classes.new)

  const onClickNew = () => clickNew()

  return (
    <Card
      className={cls.join(' ')}
      style={styles}
      onClick={isNew ? onClickNew : null}
    >
      <Div className={classes.container}>
        {!isNew ? <CardWalletHeader
          options={options}
          styles={styles}
          isShared={isShared}
        /> : <div/>}
        <CardWalletBalance
          showRealBalance={showRealBalance}
          isNew={isNew}
          options={options}
        />
      </Div>
    </Card>
  )
}

CardWallet.propTypes = {
  styles: PropTypes.shape({
    backgroundColor: PropTypes.string,
    color: PropTypes.string
  }),
  options: PropTypes.object,
  type: PropTypes.oneOf(['new', 'shared', 'wallet'])
}
