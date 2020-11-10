import LocalStorageClient from './clients/LocalStorageClient'

export class StateProcessor {
  static userID

  static get client() {
    return new LocalStorageClient()
  }

  static async saveWallet(wallet) {
    if (!wallet) return
    return await this.client.saveWallet(wallet)
  }

  static async saveCategory(category, type) {
    return await this.client.saveCategory(category, type)
  }

  static async saveOperation(operation) {
    return await this.client.saveOperation(operation)
  }

  static async deleteWallet(walletID) {
    return await this.client.deleteWallet(walletID)
  }

  static async deleteCategory(categoryID, type) {
    return await this.client.deleteCategory(categoryID, type)
  }

  static async getWallets() {
    return await this.client.getWallets()
  }

  static async getUser() {
    return await this.client.getUser()
  }

  static async getCategories() {
    return await this.client.getCategories()
  }

  static async getOperations(start, end) {
    return await this.client.getOperations(start, end)
  }
}
