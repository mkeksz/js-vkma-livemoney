import {ERRORS, MAX_CATEGORIES, MAX_OPERATIONS_PER_DAY, MAX_WALLETS
} from '@/constants/constants'


const ERROR_MESSAGE = {
  [ERRORS.MAX_OPERATIONS]: {
    title: 'Превышен лимит',
    text: 'Лимит операций в день: ' + MAX_OPERATIONS_PER_DAY
  },
  [ERRORS.MAX_WALLETS]: {
    title: 'Превышен лимит',
    text: 'Лимит активных счетов: ' + MAX_WALLETS
  },
  [ERRORS.MAX_CATEGORIES]: {
    title: 'Превышен лимит',
    text: 'Лимит категорий: ' + MAX_CATEGORIES
  },
  DEFAULT: {
    title: 'Неизвестная ошибка'
  }
}

export function getMessageError(error) {
  return ERROR_MESSAGE[error] || {...ERROR_MESSAGE.DEFAULT, content: error}
}
