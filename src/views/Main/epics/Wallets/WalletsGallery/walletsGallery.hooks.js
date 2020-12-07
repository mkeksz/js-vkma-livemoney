import {useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {KEYS_STORAGE_VK} from '@/constants/constants'
import {getSharedWallet} from './walletsGallery.functions'
import {setTooltip} from '@/store/actions/tooltipActions'
import {storageSet} from '@/core/bridge'


export function useSharedWallet(wallets) {
  return useMemo(() => getSharedWallet(wallets), [wallets])
}

export function useTooltips() {
  const dispatch = useDispatch()

  const showTooltips = useSelector(({tooltips}) => tooltips.wallets)

  const [startShow, setStartShow] = useState(showTooltips)
  const [newWalletShow, setNewWalletShow] = useState(false)

  const startOn = useMemo(() => {
    return () => {
      dispatch(setTooltip('wallets', false))
      storageSet(KEYS_STORAGE_VK.TOOLTIP_WALLETS, 'true')
      setStartShow(false)
      setNewWalletShow(true)
    }
  }, [])

  const newWalletOn = useMemo(() => {
    return () => setNewWalletShow(false)
  }, [])

  return {
    start: {show: startShow, on: startOn},
    newWallet: {show: newWalletShow, on: newWalletOn}
  }
}


