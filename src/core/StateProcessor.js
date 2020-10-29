import LocalStorageClient from './clients/LocalStorageClient'

export class StateProcessor {
  static userID

  static get client() {
    return new LocalStorageClient(this.userID)
  }

  static async saveData(type, data) {
    return await this.client.save(type, data)
  }

  static async getData(type) {
    if (typeof type === 'string') type = [type]
    return await this.client.get(type)
  }
}
