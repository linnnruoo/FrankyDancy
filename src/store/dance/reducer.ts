import { ActionType, getType } from 'typesafe-actions'

import { Dance } from 'common/models'

import {
  fetchActiveDanceSessionAction,
  endActiveDanceSessionAction,
  startNewDanceSessionAction,
} from './actions'

export type DanceActionType = ActionType<
  | typeof fetchActiveDanceSessionAction
  | typeof endActiveDanceSessionAction
  | typeof startNewDanceSessionAction
>

interface DanceState {
  active?: Dance
}

const initialState: Readonly<DanceState> = {
  active: undefined,
}

export default (state = initialState, action: DanceActionType) => {
  switch (action.type) {
    case getType(startNewDanceSessionAction.success):
    case getType(fetchActiveDanceSessionAction.success): {
      const dance = action.payload
      return {
        ...state,
        active: dance,
      }
    }
    case getType(endActiveDanceSessionAction.success): {
      return {
        ...state,
        active: undefined,
      }
    }
    default:
      return state
  }
}
