import { createAsyncAction } from 'typesafe-actions'
import { Dispatch } from 'redux'
import _ from 'lodash'

import { Dance, Dancer, WrongPosition } from 'common/models'
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

export const startNewDanceSessionAction = createAsyncAction(
  'Start_New_Dance_Session__Request',
  'Start_New_Dance_Session__Success',
  'Start_New_Dance_Session__Failure',
)<void, Dance, Error>()

export const storeWrongMovementsInfoAction = createAsyncAction(
  'Store_Wrong_Positions__Request',
  'Store_Wrong_Positions__Success',
  'Store_Wrong_Positions__Failure',
)<void, WrongPosition, Error>()

export const fetchActiveDanceSession = () => (dispatch: Dispatch) => {
  dispatch(fetchActiveDanceSessionAction.request())
  axiosInstance
    .get('/dance/active')
    .then((res) => {
      const dance: Dance = _.get(res, 'data', {})
      dispatch(fetchActiveDanceSessionAction.success(dance))
    })
    .catch((err) => dispatch(fetchActiveDanceSessionAction.failure(err)))
}

export const endDanceSession = () => (dispatch: Dispatch) => {
  dispatch(endActiveDanceSessionAction.request())
  axiosInstance
    .post(`/dance/end`)
    .then(() => dispatch(endActiveDanceSessionAction.success()))
    .catch((err) => endActiveDanceSessionAction.failure(err))
}

export const startDanceSession = (newDancers: Dancer[]) => (
  dispatch: Dispatch,
) => {
  dispatch(startNewDanceSessionAction.request())
  axiosInstance
    .post('/dance/', { dancers: newDancers })
    .then((res) => {
      const dance: Dance = _.get(res, 'data', {})
      dispatch(startNewDanceSessionAction.success(dance))
    })
    .catch((err) => dispatch(startNewDanceSessionAction.failure(err)))
}

export const storeWrongMovementsInfo = (wrongPos: WrongPosition) => (
  dispatch: Dispatch,
) => {
  try {
    dispatch(storeWrongMovementsInfoAction.success(wrongPos))
  } catch (err) {
    dispatch(storeWrongMovementsInfoAction.failure(err))
  }
}
