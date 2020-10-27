import { ActionType, getType } from 'typesafe-actions'

import { Dance, WrongPosition } from 'common/models'

import {
  fetchActiveDanceSessionAction,
  endActiveDanceSessionAction,
  startNewDanceSessionAction,
  storeWrongPositionsAction,
} from './actions'

export type DanceActionType = ActionType<
  | typeof fetchActiveDanceSessionAction
  | typeof endActiveDanceSessionAction
  | typeof startNewDanceSessionAction
  | typeof storeWrongPositionsAction
>

interface DanceState {
  active?: Dance
  wrongPositions: Array<WrongPosition>
}

const initialState: Readonly<DanceState> = {
  active: undefined,
  wrongPositions: [],
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
    case getType(storeWrongPositionsAction.success): {
      const newPos = [action.payload, ...state.wrongPositions]
      return {
        ...state,
        wrongPositions: newPos,
      }
    }
    default:
      return state
  }
}
