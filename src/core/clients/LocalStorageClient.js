import {capitalize, storage} from '../utils'
import {ICONS, TYPES_DATA_STATE as types} from '../../constants/constants'

export default class LocalStorageClient {
  constructor(userID) {
    this.userID = userID
  }

  async save(typeData, data) {
    storage(`${this.userID}:${typeData}`, data)
    return true
  }

  async get(typesData) {
    const data = {}

    for (const type of typesData) {
      data[type] = await this['get' + capitalize(type)]()
    }

    return data
  }

  async getWallets() {
    const key = `${this.userID}:${types.WALLETS}`

    let result = storage(key)

    if (result === null) {
      await this.save(types.WALLETS, {
        activeWallets: [
          {
            id: 1,
            title: 'Наличные',
            icon: ICONS.WALLET,
            balance: 1400,
            styles: {backgroundColor: '#cfac50', color: '#fff'},
            inTotal: true
          }
        ],
        inactiveWallets: [],
        maxActiveWallets: 5
      })
      result = storage(key)
    }

    return result
  }

  async getUser() {
    const key = `${this.userID}:${types.USER}`

    let result = storage(key)

    if (result === null) {
      await this.save(types.USER, {
        id: this.userID,
        premium: {
          isActive: false,
          expiryDate: null
        }
      })
      result = storage(key)
    }

    return result
  }
}
