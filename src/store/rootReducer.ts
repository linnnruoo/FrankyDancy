import { combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'

import userReducer from 'store/user/reducer'

const rootReducer = combineReducers({
  user: userReducer,
})

export type RootState = StateType<typeof rootReducer>

export default rootReducer
