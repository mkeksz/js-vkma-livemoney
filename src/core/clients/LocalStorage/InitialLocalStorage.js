import {COLORS, ICONS} from '@/constants/constants'

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
      budget: 1300
    },
    {
      id: 2,
      title: 'Еда',
      icon: ICONS.UTENSILS,
      budget: null
    },
    {
      id: 3,
      title: 'Игры',
      icon: ICONS.GAMEPAD,
      budget: null
    },
    {
      id: 4,
      title: 'Семья',
      icon: ICONS.USERS,
      budget: 2000
    }
  ],
  income: [
    {
      id: 1,
      title: 'Работа',
      icon: ICONS.BRIEFCASE,
      budget: null
    },
    {
      id: 2,
      title: 'Фриланс',
      icon: ICONS.LAPTOP_HOUSE,
      budget: null
    },
    {
      id: 3,
      title: 'Бизнес',
      icon: ICONS.STORE,
      budget: null
    }
  ]
}

export const initialOperations = [
  // {
  //   id: 1,
  //   amount: 100,
  //   dateCreate: new Date().toISOString(),
  //   date: '2020-11-05T10:20:30Z',
  //   type: 'expense',
  //   description: 'тест',
  //   from: {
  //     type: 'wallet',
  //     itemID: 1
  //   },
  //   to: {
  //     type: 'category',
  //     itemID: 2
  //   }
  // },
  // {
  //   id: 2,
  //   amount: 1000,
  //   dateCreate: new Date().toISOString(),
  //   date: '2020-11-06T10:10:30Z',
  //   type: 'expense',
  //   description: 'тест2',
  //   from: {
  //     type: 'wallet',
  //     itemID: 1
  //   },
  //   to: {
  //     type: 'category',
  //     itemID: 3
  //   }
  // },
  // {
  //   id: 3,
  //   amount: 500,
  //   dateCreate: new Date().toISOString(),
  //   date: '2020-11-06T10:20:20Z',
  //   type: 'income',
  //   description: '',
  //   from: {
  //     type: 'category',
  //     itemID: 2
  //   },
  //   to: {
  //     type: 'wallet',
  //     itemID: 2
  //   }
  // },
  // {
  //   id: 4,
  //   amount: 500,
  //   dateCreate: new Date().toISOString(),
  //   date: '2020-11-06T10:20:30Z',
  //   type: 'income',
  //   description: '',
  //   from: {
  //     type: 'category',
  //     itemID: 2
  //   },
  //   to: {
  //     type: 'wallet',
  //     itemID: 2
  //   }
  // },
  // {
  //   id: 5,
  //   amount: 7000,
  //   dateCreate: new Date().toISOString(),
  //   date: '2020-11-07T10:20:30Z',
  //   type: 'transfer',
  //   description: '',
  //   from: {
  //     type: 'wallet',
  //     itemID: 1
  //   },
  //   to: {
  //     type: 'wallet',
  //     itemID: 2
  //   }
  // }
].reverse()

export const initialUser = {
  id: 1,
  premium: {
    isActive: false,
    expiryDate: null
  }
}

export const initialAnalytics = [
  {
    amounts: {
      expense: [
        {
          id: 1,
          amount: 1300
        },
        {
          id: 2,
          amount: 300
        },
        {
          id: 3,
          amount: 2300
        },
        {
          id: 4,
          amount: 50
        }
      ],
      income: [
        {
          id: 1,
          amount: 200
        },
        {
          id: 2,
          amount: 500
        },
        {
          id: 3,
          amount: 1000
        }
      ]
    },
    date: '2020-11'
  },
  {
    amounts: {
      expense: [
        {
          id: 1,
          amount: 300
        },
        {
          id: 2,
          amount: 200
        },
        {
          id: 3,
          amount: 23500
        },
        {
          id: 4,
          amount: 500
        }
      ],
      income: [
        {
          id: 1,
          amount: 2002
        },
        {
          id: 2,
          amount: 5005
        },
        {
          id: 3,
          amount: 10003
        }
      ]
    },
    date: '2020-10'
  },
  {
    amounts: {
      expense: [
        {
          id: 1,
          amount: 25
        },
        {
          id: 2,
          amount: 167
        },
        {
          id: 3,
          amount: 6445
        },
        {
          id: 4,
          amount: 234
        }
      ],
      income: [
        {
          id: 1,
          amount: 534
        },
        {
          id: 2,
          amount: 654
        },
        {
          id: 3,
          amount: 234
        }
      ]
    },
    date: '2020-8'
  },
  {
    amounts: {
      expense: [
        {
          id: 1,
          amount: 25
        },
        {
          id: 2,
          amount: 167
        },
        {
          id: 3,
          amount: 6445
        },
        {
          id: 4,
          amount: 234
        }
      ],
      income: [
        {
          id: 1,
          amount: 534
        },
        {
          id: 2,
          amount: 654
        },
        {
          id: 3,
          amount: 234
        }
      ]
    },
    date: '2020-7'
  },
  {
    amounts: {
      expense: [
        {
          id: 1,
          amount: 25
        },
        {
          id: 2,
          amount: 167
        },
        {
          id: 3,
          amount: 6445
        },
        {
          id: 4,
          amount: 234
        }
      ],
      income: [
        {
          id: 1,
          amount: 534
        },
        {
          id: 2,
          amount: 654
        },
        {
          id: 3,
          amount: 234
        }
      ]
    },
    date: '2020-6'
  },
  {
    amounts: {
      expense: [
        {
          id: 1,
          amount: 25
        },
        {
          id: 2,
          amount: 167
        },
        {
          id: 3,
          amount: 6445
        },
        {
          id: 4,
          amount: 234
        }
      ],
      income: [
        {
          id: 1,
          amount: 534
        },
        {
          id: 2,
          amount: 654
        },
        {
          id: 3,
          amount: 234
        }
      ]
    },
    date: '2020-5'
  },
  {
    amounts: {
      expense: [
        {
          id: 1,
          amount: 25
        },
        {
          id: 2,
          amount: 167
        },
        {
          id: 3,
          amount: 6445
        },
        {
          id: 4,
          amount: 234
        }
      ],
      income: [
        {
          id: 1,
          amount: 534
        },
        {
          id: 2,
          amount: 654
        },
        {
          id: 3,
          amount: 234
        }
      ]
    },
    date: '2020-4'
  },
  {
    amounts: {
      expense: [
        {
          id: 1,
          amount: 25
        },
        {
          id: 2,
          amount: 167
        },
        {
          id: 3,
          amount: 6445
        },
        {
          id: 4,
          amount: 234
        }
      ],
      income: [
        {
          id: 1,
          amount: 534
        },
        {
          id: 2,
          amount: 654
        },
        {
          id: 3,
          amount: 234
        }
      ]
    },
    date: '2020-3'
  },
  {
    amounts: {
      expense: [
        {
          id: 1,
          amount: 25
        },
        {
          id: 2,
          amount: 167
        },
        {
          id: 3,
          amount: 6445
        },
        {
          id: 4,
          amount: 234
        }
      ],
      income: [
        {
          id: 1,
          amount: 534
        },
        {
          id: 2,
          amount: 654
        },
        {
          id: 3,
          amount: 234
        }
      ]
    },
    date: '2020-2'
  },
  {
    amounts: {
      expense: [
        {
          id: 1,
          amount: 25
        },
        {
          id: 2,
          amount: 167
        },
        {
          id: 3,
          amount: 6445
        },
        {
          id: 4,
          amount: 234
        }
      ],
      income: [
        {
          id: 1,
          amount: 534
        },
        {
          id: 2,
          amount: 654
        },
        {
          id: 3,
          amount: 234
        }
      ]
    },
    date: '2020-1'
  },
  {
    amounts: {
      expense: [
        {
          id: 1,
          amount: 25
        },
        {
          id: 2,
          amount: 167
        },
        {
          id: 3,
          amount: 6445
        },
        {
          id: 4,
          amount: 234
        }
      ],
      income: [
        {
          id: 1,
          amount: 534
        },
        {
          id: 2,
          amount: 654
        },
        {
          id: 3,
          amount: 234
        }
      ]
    },
    date: '2019-12'
  },
  {
    amounts: {
      expense: [
        {
          id: 1,
          amount: 25
        },
        {
          id: 2,
          amount: 167
        },
        {
          id: 3,
          amount: 6445
        },
        {
          id: 4,
          amount: 234
        }
      ],
      income: [
        {
          id: 1,
          amount: 534
        },
        {
          id: 2,
          amount: 654
        },
        {
          id: 3,
          amount: 234
        }
      ]
    },
    date: '2019-11'
  }
]
