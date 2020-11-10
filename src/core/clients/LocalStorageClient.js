import {storage} from '../utils'
import {
  initialCategories, initialOperations, initialUser, initialWallets
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

  async saveOperation(operation) {
    const key = getKey(KEY_OPERATIONS)

    const isEdit = operation.id !== null
    const operations = await this.getOperations(0, -1)

    if (isEdit) {
      const targetIndex = operations.findIndex(op =>
        op.id === operation.id)
      operations[targetIndex] = operation
    } else {
      operation.id = operations.length > 0
        ? operations[operations.length - 1].id + 1
        : 1
      operations.unshift(operation)
    }

    storage(key, operations)
    return operations
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
      = getContentStorage(initialOperations, KEY_OPERATIONS)

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
