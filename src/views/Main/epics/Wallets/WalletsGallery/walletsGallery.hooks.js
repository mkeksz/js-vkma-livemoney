import {useMemo} from 'react'
import {getSharedWallet} from './walletsGallery.functions'


export function useSharedWallet(wallets) {
  return useMemo(() => getSharedWallet(wallets), [wallets])
}
