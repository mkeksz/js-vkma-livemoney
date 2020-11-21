import {useMemo} from 'react'
import {getSharedWallet} from './walletsGallery.functions'


export function useSlide(slide, maxSlide) {
  return useMemo(() => {
    return slide > maxSlide ? maxSlide : slide
  }, [])
}

export function useInitialSlide(initialSlide, wallets) {
  return useMemo(() => {
    const MAX_DEFAULT_SLIDE_INDEX = 1

    return initialSlide > wallets.length + MAX_DEFAULT_SLIDE_INDEX
      ? wallets.length + MAX_DEFAULT_SLIDE_INDEX
      : initialSlide
  }, [initialSlide, wallets])
}

export function useSharedWallet(wallets) {
  return useMemo(() => getSharedWallet(wallets), [wallets])
}
