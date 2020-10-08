import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { RootState } from 'store/rootReducer'
import { startDanceSession } from 'store/dance/actions'
import { getUsers } from 'store/user/selectors'
import {
  getActiveDanceSession,
  groupActiveDancersByUserId,
} from 'store/dance/selector'
import Logo from 'components/Logo'
import Stack from 'components/Stack'

import UserList from './UserList'

type Props = CombinedProps<typeof mapStateToProps, typeof mapDispatchToProps>

const Home: React.FC<Props> = ({
  users,
  activeDanceSession,
  activeDancers,
  startDanceSession,
}) => {
  return (
    <Stack center vertical>
      <Logo />
      <UserList
        users={users}
        activeDanceSession={activeDanceSession}
        activeDancers={activeDancers}
        startDanceSession={startDanceSession}
      />
    </Stack>
  )
}

const mapStateToProps = (s: RootState) => ({
  users: getUsers(s),
  activeDanceSession: getActiveDanceSession(s),
  activeDancers: groupActiveDancersByUserId(s),
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      startDanceSession: startDanceSession,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
