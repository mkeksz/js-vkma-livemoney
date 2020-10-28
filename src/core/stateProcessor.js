import LocalStorageClient from './clients/LocalStorageClient'
import store from '../store/store'

const client = new LocalStorageClient(store.getState().user.id)

export function save(state) {
  client.save(state)
}

export function getWallets() {
  return client.getWallets()
}
