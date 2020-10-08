import { keyBy } from 'lodash'
import { ActionType, getType } from 'typesafe-actions'

import { User } from 'common/models'

import { fetchUsersAction } from './actions'

export type UserActionType = ActionType<typeof fetchUsersAction>

interface UserState {
  users: Dict<User>
}

const initialState: Readonly<UserState> = {
  users: {},
}

export default (state = initialState, action: UserActionType) => {
  switch (action.type) {
    case getType(fetchUsersAction.success):
      const users: Dict<User> = keyBy(action.payload, '_id')
      return {
        ...state,
        users,
      }
    default:
      return state
  }
}
