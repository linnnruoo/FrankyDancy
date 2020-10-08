import { createAsyncAction } from 'typesafe-actions'
import { Dispatch } from 'redux'
import _ from 'lodash'

import { Dance } from 'common/models'
import axiosInstance from 'configs/api'

export const fetchActiveDanceSessionAction = createAsyncAction(
  'Fetch_Active_Dance_Session__Request',
  'Fetch_Active_Dance_Session__Success',
  'Fetch_Active_Dance_Session__Failure',
)<void, Dance, Error>()

export const endActiveDanceSessionAction = createAsyncAction(
  'End_Dance_Session__Request',
  'End_Dance_Session__Success',
  'End_Dance_Session__Failure',
)<void, void, Error>()

export const fetchActiveDanceSession = () => (dispatch: Dispatch) => {
  dispatch(fetchActiveDanceSessionAction.request())
  axiosInstance
    .get('/dance/active')
    .then((res) => {
      const dance: Dance = _.get(res, 'data', [])
      dispatch(fetchActiveDanceSessionAction.success(dance))
    })
    .catch((err) => dispatch(fetchActiveDanceSessionAction.failure(err)))
}

export const endDanceSession = () => (dispatch: Dispatch) => {
  dispatch(endActiveDanceSessionAction.request())
  axiosInstance
    .post(`/end`)
    .then(() => endActiveDanceSessionAction.success())
    .catch((err) => endActiveDanceSessionAction.failure(err))
}
