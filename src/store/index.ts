import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from 'store/rootReducer'

const middleware = [thunk]

const initialState = {}

const configureDevTools = () => {
  if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    return (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }
  return compose
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    configureDevTools()(),
  ),
)

export default store
