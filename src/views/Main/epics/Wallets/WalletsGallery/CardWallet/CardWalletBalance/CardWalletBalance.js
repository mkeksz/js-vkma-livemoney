import React from 'react'
import PropTypes from 'prop-types'
import {Icon56AddCircleOutline} from '@vkontakte/icons'
import {Headline, Title} from '@vkontakte/vkui'
import {currencyFilter} from '@/filters/numbersFilter'
import classes from '../CardWallet.module.sass'


export const CardWalletBalance = ({options, isNew, showRealBalance}) => {
  return (
    <div className={classes.balance}>
      {
        isNew
          ? <Icon56AddCircleOutline width={100} height={100} />
          : (
            <Title weight="bold" level="1">
              {currencyFilter(options.balance)}
            </Title>
          )
      }
      {showRealBalance && (
        <Headline weight="regular">
          {currencyFilter(options.realBalance)}
        </Headline>
      )}
    </div>
  )
}

CardWalletBalance.propTypes = {
  options: PropTypes.object,
  isNew: PropTypes.bool,
  showRealBalance: PropTypes.bool
}
