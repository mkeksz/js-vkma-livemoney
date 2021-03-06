import {combineReducers} from 'redux'
import app from './reducers/app/appReducer'
import wallets from './reducers/wallets/walletsReducer'
import user from './reducers/user/userReducer'
import pages from './reducers/pages/pagesReducer'
import categories from './reducers/categories/categoriesReducer'
import operations from './reducers/operations/operationsReducer'
import analytics from './reducers/analytics/analyticsReducer'
import colors from './reducers/colors/colorsReducer'
import icons from './reducers/icons/iconsReducer'
import tooltips from './reducers/tooltips/tooltipsReducer'


export const rootReducer = combineReducers({
  app,
  wallets,
  user,
  pages,
  categories,
  operations,
  analytics,
  colors,
  icons,
  tooltips
})
