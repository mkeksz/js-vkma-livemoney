import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {Caption} from '@vkontakte/vkui'
import {Icon24Write} from '@vkontakte/icons'
import {PAGES} from '@/constants/constants'
import {Icon} from '@/components/UI/Icon/Icon'
import {setPageOptions} from '@/store/actions/pagesActions'
import {nextPage} from '@/store/actions/appActions'
import classes from '../CardWallet.module.sass'


export const CardWalletHeader = ({options, styles, isShared = false}) => {
  const dispatch = useDispatch()

  const onEdit = () => {
    dispatch(setPageOptions(PAGES.WALLET, {
      wallet: options,
      initWallet: options
    }))
    dispatch(nextPage({view: PAGES.WALLET}))
  }

  return (
    <div className={classes.header}>
      <div className={classes.icon}>
        {options.icon && <Icon icon={options.icon}/>}
      </div>
      <Caption
        level="1"
        weight="medium"
        className={classes.title}
        style={{color: styles.color}}
      >
        {options.title}
      </Caption>
      {!isShared && !options.disabled && (
        <div className={`${classes.icon} ${classes.edit}`} onClick={onEdit}>
          <Icon24Write width={27} height={27} style={{color: styles.color}}/>
        </div>
      )}
    </div>
  )
}

CardWalletHeader.propTypes = {
  options: PropTypes.object,
  styles: PropTypes.object,
  isShared: PropTypes.bool
}
