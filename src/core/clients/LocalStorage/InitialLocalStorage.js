import {ICONS} from '@/constants/constants'

export const initialWallets = [
  {
    id: 1,
    title: 'Наличные',
    icon: ICONS.WALLET,
    balance: 0,
    styles: {
      id: 'DARK_HAKI',
      backgroundColor: '#cfac50',
      color: '#fff',
      premium: false
    },
    inTotal: true
  }
]

export const initialCategories = []

export const initialOperations = [
  {
    id: 1,
    amount: 100,
    dateCreate: new Date().toISOString(),
    date: '2020-11-05T10:20:30Z',
    type: 'expense',
    description: 'тест',
    from: {
      type: 'wallet',
      itemID: 1
    },
    to: {
      type: 'category',
      itemID: 2
    }
  },
  {
    id: 4,
    amount: 500,
    dateCreate: new Date().toISOString(),
    date: '2020-11-06T10:20:30Z',
    type: 'income',
    description: '',
    from: {
      type: 'category',
      itemID: 2
    },
    to: {
      type: 'wallet',
      itemID: 2
    }
  },
  {
    id: 5,
    amount: 7000,
    dateCreate: new Date().toISOString(),
    date: '2020-11-07T10:20:30Z',
    type: 'transfer',
    description: '',
    from: {
      type: 'wallet',
      itemID: 1
    },
    to: {
      type: 'wallet',
      itemID: 2
    }
  }
]

export const initialUser = {
  id: 1,
  premium: {
    isActive: false,
    expiryDate: null
  }
}

export const initialAnalytics = [
  {
    amounts: [],
    id: 1,
    date: '2020-11'
  }
]
