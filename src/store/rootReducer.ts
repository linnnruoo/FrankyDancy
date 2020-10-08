import { combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'

import userReducer from 'store/user/reducer'
import danceReducer from 'store/dance/reducer'

const rootReducer = combineReducers({
  user: userReducer,
  dance: danceReducer,
})

export type RootState = StateType<typeof rootReducer>

export default rootReducer
