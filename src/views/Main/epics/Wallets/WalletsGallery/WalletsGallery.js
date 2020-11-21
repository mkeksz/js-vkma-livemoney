import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {Gallery} from '@vkontakte/vkui'
import {PAGES} from '@/constants/constants'
import {CardWallet} from './CardWallet/CardWallet'
import {setPageOptions} from '@/store/actions/pagesActions'
import {useInitialSlide, useSharedWallet, useSlide
} from './walletsGallery.hooks'
import classes from './WalletsGallery.module.sass'


export const WalletsGallery = ({wallets}) => {
  const dispatch = useDispatch()

  const _initSlide = useSelector(({pages}) => pages[PAGES.WALLETS].initialSlide)
  const initialSlide = useInitialSlide(_initSlide, wallets)
  const [curSlide, setCurSlide] = useState(initialSlide)
  const slide = useSlide(curSlide, wallets.length + 1)

  const sharedWallet = useSharedWallet(wallets)

  const onChangeSlide = index => {
    setCurSlide(index)
    dispatch(setPageOptions(PAGES.WALLETS, {initialSlide: index}))
  }

  return (
    <Gallery
      initialSlideIndex={initialSlide}
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
