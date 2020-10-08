import { ActionType, getType } from 'typesafe-actions'

import { Dance } from 'common/models'

import { fetchActiveDanceSessionAction } from './actions'

export type DanceActionType = ActionType<typeof fetchActiveDanceSessionAction>

interface DanceState {
  active?: Dance
}

const initialState: Readonly<DanceState> = {
  active: undefined,
}

export default (state = initialState, action: DanceActionType) => {
  switch (action.type) {
    case getType(fetchActiveDanceSessionAction.success): {
      const dance = action.payload
      return {
        ...state,
        active: dance,
      }
    }
    default:
      return state
  }
}
