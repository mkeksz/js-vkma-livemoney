import {SET_WALLETS} from '../types'

export function setWallets(wallets) {
  return {type: SET_WALLETS, payload: wallets}
}
