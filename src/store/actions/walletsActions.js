import {REMOVE_WALLET, SAVE_WALLET, SET_WALLETS} from '../types'

export function setWallets(wallets) {
  return {type: SET_WALLETS, payload: wallets}
}
export function removeWallet(walletID) {
  return {type: REMOVE_WALLET, payload: walletID}
}
export function saveWallet(wallet, rollback) {
  return {type: SAVE_WALLET, payload: {wallet, rollback}}
}
