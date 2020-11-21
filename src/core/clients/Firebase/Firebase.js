import {StateProcessor as SP} from '@/core/StateProcessor'
import {mapAnalytics, mapOperations} from './firebase.functions'


const baseURL = 'https://europe-west6-vkma-livemoney.cloudfunctions.net/'

export default class Firebase {
  async getAuthData() {
    const res = await fetch(`${baseURL}authUser${SP.params}`)

    const resJSON = await res.json()
    if (resJSON.error || !resJSON.result) return resJSON

    const data = resJSON.result
    data.analytics = mapAnalytics(data.analytics)
    data.operations = mapOperations(data.operations)
    return data
  }

  async saveWallet(wallet) {
    const url = `${baseURL}saveWallet${SP.params}`

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(wallet)
    })

    return await res.json()
  }

  async deleteWallet(walletID) {
    const url = `${baseURL}deleteWallet${SP.params}`

    const res = await fetch(url, {
      method: 'POST',
      body: walletID
    })

    return await res.json()
  }

  async saveOperation(operation) {
    const _operation = Object.assign({}, operation)
    _operation.date = new Date(_operation.date).getTime() / 1000 | 0

    const url = `${baseURL}saveOperation${SP.params}`
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(_operation)
    })

    const resJSON = await res.json()
    if (resJSON.error || !resJSON.result) return resJSON

    resJSON.result.analytics = mapAnalytics(resJSON.result.analytics)
    resJSON.result.operations = mapOperations(resJSON.result.operations)
    return resJSON
  }

  async deleteOperation(operationID) {
    const url = `${baseURL}deleteOperation${SP.params}`

    const res = await fetch(url, {
      method: 'POST',
      body: operationID
    })

    const resJSON = await res.json()
    if (resJSON.error || !resJSON.result) return resJSON

    resJSON.result.analytics = mapAnalytics(resJSON.result.analytics)
    resJSON.result.operations = mapOperations(resJSON.result.operations)
    return resJSON
  }

  async saveCategory(category) {
    const url = `${baseURL}saveCategory${SP.params}`

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(category)
    })

    return await res.json()
  }

  async deleteCategory(categoryID) {
    const url = `${baseURL}deleteCategory${SP.params}`

    const res = await fetch(url, {
      method: 'POST',
      body: categoryID
    })

    return await res.json()
  }
}
