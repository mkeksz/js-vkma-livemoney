import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {Gallery} from '@vkontakte/vkui'
import {PAGES} from '@/constants/constants'
import {CardWallet} from './CardWallet/CardWallet'
import {setPageOptions} from '@/store/actions/pagesActions'
import {useSharedWallet} from './walletsGallery.hooks'
import classes from './WalletsGallery.module.sass'


export const WalletsGallery = ({wallets}) => {
  const dispatch = useDispatch()

  const slide = useSelector(({pages}) => pages[PAGES.WALLETS].slide)
  const sharedWallet = useSharedWallet(wallets)

  const onChangeSlide = index => {
    dispatch(setPageOptions(PAGES.WALLETS, {slide: index}))
  }

  return (
    <Gallery
      align="center"
      slideWidth="90%"
      bullets={false}
      className={classes.GalleryWallets}
      onChange={onChangeSlide}
      slideIndex={slide}
    >
      <CardWallet type="new"/>
      <CardWallet
        type="shared"
        styles={{backgroundColor: '#353c44', color: '#fff'}}
        options={{...sharedWallet, title: 'Всего'}}
      />
      {wallets.map(wallet => <CardWallet
        key={wallet.id}
        type="wallet"
        styles={wallet.styles}
        options={wallet}
      />)}
    </Gallery>
  )
}

WalletsGallery.propTypes = {
  wallets: PropTypes.array.isRequired
}
