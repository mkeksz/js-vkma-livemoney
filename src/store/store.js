import {compose, createStore, applyMiddleware} from 'redux'
import {rootReducer} from './rootReducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const middleware = applyMiddleware(thunk)

export default createStore(
    rootReducer, process.env.NODE_ENV === 'development'
      ? composeWithDevTools(middleware)
      : compose(middleware)
)
