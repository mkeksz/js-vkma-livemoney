import Firebase from './clients/Firebase/Firebase'


export class StateProcessor {
  static params
  static parsedParams
  static userID

  static get client() {
    return new Firebase()
  }


  static async getAuthData() {
    return await this.client.getAuthData()
  }

  static async saveWallet(wallet) {
    return await this.client.saveWallet(wallet)
  }

  static async saveCategory(category) {
    return await this.client.saveCategory(category)
  }

  static async saveOperation(operation) {
    return await this.client.saveOperation(operation)
  }

  static async deleteWallet(walletID) {
    return await this.client.deleteWallet(walletID)
  }

  static async deleteCategory(categoryID) {
    return await this.client.deleteCategory(categoryID)
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
