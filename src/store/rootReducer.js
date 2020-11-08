import {combineReducers} from 'redux'
import app from './reducers/app/appReducer'
import wallets from './reducers/wallets/walletsReducer'
import user from './reducers/user/userReducer'
import pages from './reducers/pages/pagesReducer'
import categories from './reducers/categories/categoriesReducer'
import operations from './reducers/operations/operationsReducer'

export const rootReducer = combineReducers({
  app,
  wallets,
  user,
  pages,
  categories,
  operations
})
