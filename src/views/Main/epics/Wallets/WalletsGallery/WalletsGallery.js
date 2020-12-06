import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {Gallery, Tooltip} from '@vkontakte/vkui'
import {PAGES as P} from '@/constants/constants'
import {CardWallet} from './CardWallet/CardWallet'
import {setPageOptions} from '@/store/actions/pagesActions'
import {useSharedWallet, useTooltips} from './walletsGallery.hooks'
import classes from './WalletsGallery.module.sass'


export const WalletsGallery = ({wallets}) => {
  const dispatch = useDispatch()

  const tooltips = useTooltips()

  let slide = useSelector(({pages}) => pages[P.WALLETS].slide)
  if (slide > wallets.length + 1) slide = wallets.length + 1
  const sharedWallet = useSharedWallet(wallets)

  const onChangeSlide = slide => dispatch(setPageOptions(P.WALLETS, {slide}))

  return (
    <>
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
      <Tooltip
        header='Это кошелёк'
        isShown={tooltips.start.show}
        onClose={tooltips.start.on}
        alignX='right'
        offsetY={0}
        text='Здесь отображается баланс Ваших счетов'
      >
        <div style={{width: '70%'}}/>
      </Tooltip>
      <Tooltip
        header='Сначала добавь новый счёт'
        isShown={tooltips.newWallet.show}
        onClose={tooltips.newWallet.on}
        text='(Сделай свайп вправо)'
      >
        <div style={{width: '70%'}}/>
      </Tooltip>
    </>
  )
}

WalletsGallery.propTypes = {
  wallets: PropTypes.array.isRequired
}
