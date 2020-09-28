import { createSelector } from 'reselect'

import { RootState } from 'store/rootReducer'

export const userSelector = (s: RootState) => s.user

export const getUsers = createSelector(userSelector, (s) => s.users)
