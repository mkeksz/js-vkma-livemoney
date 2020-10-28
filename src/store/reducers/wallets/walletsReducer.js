import {WALLET} from '../../../constants/icons/icons'

const initialState = {
  activeWallets: [
    {
      id: 1,
      title: 'Наличные',
      icon: WALLET,
      balance: 1400,
      styles: {backgroundColor: '#cfac50', color: '#fff'},
      inTotal: true
    }
  ],
  inactiveWallets: [],
  maxActiveWallets: 5
}

const handlers = {
  DEFAULT: state => state
}

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
