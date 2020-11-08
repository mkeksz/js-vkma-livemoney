import {storage} from '../utils'
import {
  initialCategories, initialUser, initialWallets
} from './InitialLocalStorage'
import {StateProcessor} from '../StateProcessor'

const KEY_WALLETS = 'wallets'
const KEY_CATEGORIES = 'categories'
const KEY_USER = 'user'
const KEY_OPERATIONS = 'operations'

export default class LocalStorageClient {
  async saveWallet(wallet) {
    const key = getKey(KEY_WALLETS)

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

  async saveCategory(category, type) {
    const key = getKey(KEY_CATEGORIES)

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

  async deleteWallet(walletID) {
    const key = getKey(KEY_WALLETS)

    const wallets = await this.getWallets()
    const targetIndexWallet = wallets.findIndex(wal => wal.id === walletID)

    wallets.splice(targetIndexWallet, 1)

    storage(key, wallets)
    return wallets
  }

  async deleteCategory(categoryID, type) {
    const key = getKey(KEY_CATEGORIES)

    const categories = await this.getCategories()
    const targetIndexCategory = categories[type]
        .findIndex(cat => cat.id === categoryID)

    categories[type].splice(targetIndexCategory, 1)

    storage(key, categories)
    return categories
  }

  async getWallets() {
    return getContentStorage(initialWallets, KEY_WALLETS)
  }

  async getUser() {
    return getContentStorage(initialUser, KEY_USER)
  }

  async getCategories() {
    return getContentStorage(initialCategories, KEY_CATEGORIES)
  }

  async getOperations(start, end) {
    const operations
      = getContentStorage(generateOperations(15000), KEY_OPERATIONS)

    return operations.slice(start, end)
  }
}

function getContentStorage(initialState, nameKey) {
  const key = getKey(nameKey)

  let result = storage(key)

  if (result === null) {
    storage(key, initialState)
    result = storage(key)
  }

  return result
}

function getKey(nameKey) {
  return `${StateProcessor.userID}:${nameKey}`
}

function generateOperations(countOperations) {
  const array = new Array(countOperations).fill('')

  return array.map((item, i) => ({
    id: i,
    amount: 500,
    date: '2020-11-06T23:20:30Z',
    type: 'income',
    description: '',
    from: {
      type: 'category',
      itemID: 2
    },
    to: {
      type: 'wallet',
      itemID: 2
    }
  }))
}
