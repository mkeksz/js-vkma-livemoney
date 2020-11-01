import {storage} from '../utils'
import {
  COLORS,
  ICONS
} from '../../constants/constants'

const KEY_WALLETS = 'wallets'
const KEY_USER = 'user'

export default class LocalStorageClient {
  constructor(userID) {
    this.userID = userID
  }

  async saveWallet(wallet) {
    const key = `${this.userID}:${KEY_WALLETS}`

    const isEdit = !!wallet.id
    const wallets = await this.getWallets()

    if (isEdit) {
      const targetIndexWallet = wallets.findIndex(wal =>
        wal.id === wallet.id)
      wallets[targetIndexWallet] = wallet
    } else {
      wallet.id = wallets.length > 0 ? wallets[wallets.length - 1].id + 1 : 1
      wallets.push(wallet)
    }

    storage(key, wallets)
    return wallets
  }

  async deleteWallet(walletID) {
    const key = `${this.userID}:${KEY_WALLETS}`

    const wallets = await this.getWallets()
    const targetIndexWallet = wallets.findIndex(wal => wal.id === walletID)

    wallets.splice(targetIndexWallet, 1)

    storage(key, wallets)
    return wallets
  }

  async getWallets() {
    const key = `${this.userID}:${KEY_WALLETS}`

    let result = storage(key)

    if (result === null) {
      storage(key, [
        {
          id: 1,
          title: 'Наличные',
          icon: ICONS.WALLET,
          balance: 0,
          styles: COLORS.DARK_HAKI,
          inTotal: true
        }
      ])
      result = storage(key)
    }

    return result
  }

  async getUser() {
    const key = `${this.userID}:${KEY_USER}`

    let result = storage(key)

    if (result === null) {
      storage(key, {
        id: this.userID,
        premium: {
          isActive: false,
          expiryDate: null
        }
      })
      result = storage(key)
    }

    return result
  }
}
