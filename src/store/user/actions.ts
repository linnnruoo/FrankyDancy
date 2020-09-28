import { createAsyncAction } from 'typesafe-actions'
import axios from 'axios'
import { Dispatch } from 'redux'

import { User } from 'common/models'

export const fetchUsersAction = createAsyncAction(
  'Fetch_Users__Request',
  'Fetch_Users__Success',
  'Fetch_Users__Failure',
)<void, User[], Error>()

export const fetchUsers = () => (dispatch: Dispatch) => {
  dispatch(fetchUsersAction.request())
  axios
    .get('/users/')
    .then((res) => {
      const users: User[] = res.data
      dispatch(fetchUsersAction.success(users))
    })
    .catch((err) => dispatch(fetchUsersAction.failure(err)))
}
