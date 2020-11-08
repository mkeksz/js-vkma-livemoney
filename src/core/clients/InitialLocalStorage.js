import {COLORS, ICONS} from '../../constants/constants'

export const initialWallets = [
  {
    id: 1,
    title: 'Наличные',
    icon: ICONS.WALLET,
    balance: 0,
    styles: COLORS.DARK_HAKI,
    inTotal: true
  },
  {
    id: 2,
    title: 'Тинькофф',
    icon: ICONS.CREDIT_CARD,
    balance: 500,
    styles: COLORS.ORANGE,
    inTotal: true
  }
]

export const initialCategories = {
  expense: [
    {
      id: 1,
      title: 'Здоровье',
      icon: ICONS.HEARTBEAT,
      budget: 1300,
      amount: 1000
    },
    {
      id: 2,
      title: 'Еда',
      icon: ICONS.UTENSILS,
      budget: null,
      amount: 500
    },
    {
      id: 3,
      title: 'Игры',
      icon: ICONS.GAMEPAD,
      budget: null,
      amount: 0
    },
    {
      id: 4,
      title: 'Семья',
      icon: ICONS.USERS,
      budget: 2000,
      amount: 0
    }
  ],
  income: [
    {
      id: 1,
      title: 'Работа',
      icon: ICONS.BRIEFCASE,
      budget: null,
      amount: 1000
    },
    {
      id: 2,
      title: 'Фриланс',
      icon: ICONS.LAPTOP_HOUSE,
      budget: null,
      amount: 500
    },
    {
      id: 3,
      title: 'Бизнес',
      icon: ICONS.STORE,
      budget: null,
      amount: 0
    }
  ]
}

export const initialOperations = [
  {
    id: 1,
    amount: 100,
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
    id: 2,
    amount: 1000,
    date: '2020-11-06T10:10:30Z',
    type: 'expense',
    description: 'тест2',
    from: {
      type: 'wallet',
      itemID: 1
    },
    to: {
      type: 'category',
      itemID: 3
    }
  },
  {
    id: 3,
    amount: 500,
    date: '2020-11-06T10:20:20Z',
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
    id: 4,
    amount: 500,
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
].reverse()

export const initialUser = {
  id: 1,
  premium: {
    isActive: false,
    expiryDate: null
  }
}

// function generateOperations(countOperations) {
//   const array = new Array(countOperations).fill('')
//
//   return array.map((item, i) => ({
//     id: i,
//     amount: 500,
//     date: '2020-11-06T23:20:30Z',
//     type: 'income',
//     description: '',
//     from: {
//       type: 'category',
//       itemID: 2
//     },
//     to: {
//       type: 'wallet',
//       itemID: 2
//     }
//   }))
// }
