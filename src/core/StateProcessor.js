import LocalStorage from './clients/LocalStorage/LocalStorage'

export class StateProcessor {
  static userID

  static get client() {
    return new LocalStorage()
  }

  static async saveWallet(wallet) {
    return await this.client.saveWallet(wallet)
  }

  static async saveCategory(category, type) {
    return await this.client.saveCategory(category, type)
  }

  static async saveOperation(operation, initOperation = null) {
    return await this.client.saveOperation(operation, initOperation)
  }

  static async deleteWallet(walletID) {
    return await this.client.deleteWallet(walletID)
  }

  static async deleteCategory(categoryID, type) {
    return await this.client.deleteCategory(categoryID, type)
  }

  static async deleteOperation(operationID) {
    return await this.client.deleteOperation(operationID)
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

  static async getAnalytics(start, end) {
    return await this.client.getAnalytics(start, end)
  }
}
