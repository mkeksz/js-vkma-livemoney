import {combineReducers} from 'redux'
import app from './reducers/app/appReducer'
import wallets from './reducers/wallets/walletsReducer'

export const rootReducer = combineReducers({
  app,
  wallets
})
