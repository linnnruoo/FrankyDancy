import { createAsyncAction } from 'typesafe-actions'
import { Dispatch } from 'redux'

import { User } from 'common/models'
import axiosInstance from 'configs/api'

export const fetchUsersAction = createAsyncAction(
  'Fetch_Users__Request',
  'Fetch_Users__Success',
  'Fetch_Users__Failure',
)<void, User[], Error>()

export const fetchUsers = () => (dispatch: Dispatch) => {
  dispatch(fetchUsersAction.request())
  axiosInstance
    .get('/users/')
    .then((res) => {
      const users: User[] = res.data
      dispatch(fetchUsersAction.success(users))
    })
    .catch((err) => dispatch(fetchUsersAction.failure(err)))
}
