import storage from '../../utils/storage'
import {correctWallets, getNewOperations} from './localStorage.functions'
import {initialCategories, initialOperations, initialUser, initialWallets
} from './InitialLocalStorage'
import {
  ERRORS,
  MAX_CATEGORIES,
  MAX_OPERATIONS_PER_DAY,
  MAX_WALLETS
} from '@/constants/constants'
import {StateProcessor} from '../../StateProcessor'
import {compareDates} from '@/core/utils/date'


const KEY_WALLETS = 'wallets'
const KEY_CATEGORIES = 'categories'
const KEY_USER = 'user'
const KEY_OPERATIONS = 'operations'

export default class LocalStorage {
  async saveWallet(wallet) {
    const key = getKey(KEY_WALLETS)

    const isEdit = wallet.id
    const wallets = await this.getWallets()

    if (wallets.length >= MAX_WALLETS && !isEdit) {
      return {error: ERRORS.MAX_WALLETS}
    }

    if (isEdit) {
      const targetIndexWallet = wallets.findIndex(wal => wal.id === wallet.id)
      wallets[targetIndexWallet] = wallet
    } else {
      wallet.id = wallets.length > 0 ? wallets[wallets.length - 1].id + 1 : 1
      wallets.push(wallet)
    }

    storage(key, wallets)
    return [...wallets]
  }

  async saveCategory(category, type) {
    const key = getKey(KEY_CATEGORIES)

    const isEdit = !!category.id
    const categories = await this.getCategories()
    const curCategories = categories[type]

    if (curCategories.length >= MAX_CATEGORIES && !isEdit) {
      return {error: ERRORS.MAX_CATEGORIES}
    }

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
    return {...categories}
  }

  async saveOperation(operation, initOperation = null) {
    const key = getKey(KEY_OPERATIONS)

    const operations = await this.getOperations(0, -1)

    operation.dateCreate = new Date().toISOString()
    const newOperations = getNewOperations(operation, operations)

    const toDayOperations = newOperations.filter(op => {
      return compareDates(op.dateCreate, new Date())
    })
    if (toDayOperations.length > MAX_OPERATIONS_PER_DAY) {
      return {error: ERRORS.MAX_OPERATIONS}
    }
    const dailyOperations = newOperations.filter(op => {
      return compareDates(op.date, operation.date)
    })
    if (dailyOperations.length > MAX_OPERATIONS_PER_DAY) {
      return {error: ERRORS.MAX_OPERATIONS}
    }

    if (initOperation) {
      await correctWallets(initOperation, this.getWallets.bind(this),
          this.saveWallet.bind(this), true)
    }
    await correctWallets(operation, this.getWallets.bind(this),
        this.saveWallet.bind(this))

    const newWallets = await this.getWallets()

    storage(key, newOperations)
    return {operations: [...newOperations], wallets: [...newWallets]}
  }

  async deleteWallet(walletID) {
    const key = getKey(KEY_WALLETS)

    const wallets = await this.getWallets()
    const targetIndexWallet = wallets.findIndex(wal => wal.id === walletID)

    wallets.splice(targetIndexWallet, 1)

    storage(key, wallets)
    return [...wallets]
  }

  async deleteCategory(categoryID, type) {
    const key = getKey(KEY_CATEGORIES)

    const categories = await this.getCategories()
    const targetIndexCategory = categories[type]
        .findIndex(cat => cat.id === categoryID)

    categories[type].splice(targetIndexCategory, 1)

    storage(key, categories)
    return {...categories}
  }

  async deleteOperation(operationID) {
    const key = getKey(KEY_OPERATIONS)

    const operations = await this.getOperations(0, -1)
    const targetIndexOperation = operations
        .findIndex(op => op.id === operationID)
    const operation = operations[targetIndexOperation]

    await correctWallets(operation, this.getWallets.bind(this),
        this.saveWallet.bind(this), true)
    operations.splice(targetIndexOperation, 1)

    const newWallets = await this.getWallets()

    storage(key, operations)
    return {operations: [...operations], wallets: [...newWallets]}
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

    operations.sort((a, b) => new Date(b.date) - new Date(a.date))
    return end === -1 ? operations : operations.slice(start, end)
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
