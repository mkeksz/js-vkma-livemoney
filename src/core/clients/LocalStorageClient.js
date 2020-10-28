import {storage} from '../utils'

export default class LocalStorageClient {
  constructor(name) {
    this.name = name
  }

  save(state) {
    storage(this.name, state)
    return Promise.resolve()
  }

  get() {
    return new Promise(resolve => {
      const state = storage(this.name)
      setTimeout(() => resolve(state), 1000)
    })
  }

  getWallets() {
    return Promise.resolve(storage(`${this.name}:wallets`))
  }
}
