import { createSelector } from 'reselect'
import _ from 'lodash'

import { RootState } from 'store/rootReducer'
import { getUsers } from 'store/user/selectors'
import { DancerProfile } from 'common/models'

export const danceSelector = (s: RootState) => s.dance

export const getActiveDanceSession = createSelector(
  danceSelector,
  (s) => s.active,
)

export const getActiveDancers = createSelector(
  [getActiveDanceSession],
  (danceSession) => _.get(danceSession, ['dancers'], []),
)

export const getActiveDancerProfiles = createSelector(
  [getActiveDancers, getUsers],
  (dancers, users) => {
    const dancerProfiles: DancerProfile[] = _.map(dancers, (dancer) => {
      return {
        ...dancer,
        name: _.get(users[dancer.userId], 'name'),
        url: _.get(users[dancer.userId], 'url'),
      }
    })
    return dancerProfiles
  },
)

export const groupActiveDancerProfilesByDancerNo = createSelector(
  [getActiveDancerProfiles],
  (dancerProfiles) => {
    const groupedDancerProfiles: Dict<DancerProfile> = _.keyBy(
      dancerProfiles,
      'dancerNo',
    )
    return groupedDancerProfiles
  },
)

export const mapDancerNamesToPositions = createSelector(
  // hardcode the 3 dancers
  [groupActiveDancerProfilesByDancerNo],
  (dancerProfiles) => {
    const names = _.map(_.range(_.size(dancerProfiles)), (index) => {
      // dancer no starts from 1 🤪
      if (dancerProfiles[index + 1]) {
        return dancerProfiles[index + 1].name
      }
      return ''
    })
    return names
  },
)

export const groupActiveDancersByUserId = createSelector(
  [getActiveDancers],
  (dancers) => _.keyBy(dancers, 'userId'),
)
