import {storage} from '../utils'
import {
  COLORS,
  ICONS
} from '../../constants/constants'

const KEY_WALLETS = 'wallets'
const KEY_CATEGORIES = 'categories'
const KEY_USER = 'user'

export default class LocalStorageClient {
  constructor(userID) {
    this.userID = userID
  }

  async saveWallet(wallet) {
    const key = `${this.userID}:${KEY_WALLETS}`

    const isEdit = wallet.id !== null
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

  async saveCategory(category, type) {
    const key = `${this.userID}:${KEY_CATEGORIES}`

    const isEdit = category.id !== null
    const categories = await this.getCategories()
    const curCategories = categories[type]

    if (isEdit) {
      const targetIndexCategory = curCategories.findIndex(cat =>
        cat.id === category.id)
      curCategories[targetIndexCategory] = {
        ...curCategories[targetIndexCategory],
        ...category
      }
    } else {
      category.id = curCategories.length > 0
        ? curCategories[curCategories.length - 1].id + 1
        : 1
      curCategories.push({...category, amount: 0})
    }

    storage(key, categories)
    return categories
  }

  async deleteCategory(categoryID, type) {
    const key = `${this.userID}:${KEY_CATEGORIES}`

    const categories = await this.getCategories()
    const targetIndexCategory = categories[type]
        .findIndex(cat => cat.id === categoryID)

    categories[type].splice(targetIndexCategory, 1)

    storage(key, categories)
    return categories
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

  async getCategories() {
    const key = `${this.userID}:${KEY_CATEGORIES}`

    let result = storage(key)

    if (result === null) {
      storage(key, {
        expense: [
          {
            id: 1,
            title: 'Здоровье',
            icon: ICONS.HEARTBEAT,
            budget: 1300,
            amount: 1000
          },
          {
            id: 2,
            title: 'Еда',
            icon: ICONS.UTENSILS,
            budget: null,
            amount: 500
          },
          {
            id: 3,
            title: 'Игры',
            icon: ICONS.GAMEPAD,
            budget: null,
            amount: 0
          },
          {
            id: 4,
            title: 'Семья',
            icon: ICONS.USERS,
            budget: 2000,
            amount: 0
          }
        ],
        income: [
          {
            id: 1,
            title: 'Работа',
            icon: ICONS.BRIEFCASE,
            budget: null,
            amount: 1000
          },
          {
            id: 2,
            title: 'Фриланс',
            icon: ICONS.LAPTOP_HOUSE,
            budget: null,
            amount: 500
          },
          {
            id: 3,
            title: 'Бизнес',
            icon: ICONS.STORE,
            budget: null,
            amount: 0
          }
        ]
      })
      result = storage(key)
    }

    return result
  }
}
