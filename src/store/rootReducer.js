import {combineReducers} from 'redux'
import app from './reducers/app/appReducer'
import wallets from './reducers/wallets/walletsReducer'
import user from './reducers/user/userReducer'

export const rootReducer = combineReducers({
  app,
  wallets,
  user
})
