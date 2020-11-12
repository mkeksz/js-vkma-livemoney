import icons from './icons/icons'
import colors from './colors'

export const ICONS = icons

export const COLORS = colors

export const MAX_WALLETS = 10

export const MAX_CATEGORIES = 20

export const MAX_LENGTH_INPUT_BALANCE = 15

export const MAX_OPERATIONS_PER_DAY = 5 // 500
export const MAX_OPERATIONS_PER_MONTH = MAX_OPERATIONS_PER_DAY * 32

export const MAX_LENGTH_DESCRIPTION_CATEGORY = 30

export const PAGES = {
  WALLETS: 'wallets',
  WALLET: 'wallet',
  SETTINGS: 'settings',
  MAIN: 'main',
  INTRO: 'intro',
  CATEGORIES: 'categories',
  CATEGORY: 'category',
  OPERATION: 'operation',
  MODAL_ICONS: 'modal_icons'
}

export const TYPES_OPERATION = {
  EXPENSE: 'expense',
  INCOME: 'income',
  TRANSFER: 'transfer'
}

export const TYPES_CATEGORY = {
  EXPENSE: 'expense',
  INCOME: 'income'
}

export const ERRORS = {
  MAX_WALLETS: 'max_wallets',
  MAX_CATEGORIES: 'max_categories',
  MAX_OPERATIONS: 'max_operations'
}
