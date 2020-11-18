import {StateProcessor as SP} from '@/core/StateProcessor'

const baseURL = 'http://localhost:5001/vkma-livemoney/europe-west6/'

export default class Firebase {
  async getAuthData() {
    const res = await fetch(`${baseURL}authUser${SP.params}`)

    const resJSON = await res.json()
    if (!resJSON.result) {
      return resJSON || {error: {
        code: 'response_empty',
        message: 'The response came empty'
      }}
    }
    if (resJSON.error) return resJSON

    const data = resJSON.result
    data.analytics = data.analytics
        .map(analytic => {
          const date = new Date(analytic.date['_seconds'] * 1000)
          analytic.date = `${date.getFullYear()}-${date.getMonth()}`
          return analytic
        })
        .reverse()
    return data
  }

  async saveWallet(wallet) {
    const url = `${baseURL}saveWallet${SP.params}`

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(wallet)
    })
    return res.json()
  }
}
