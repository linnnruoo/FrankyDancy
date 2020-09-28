import React, { FC } from 'react'
import { Route, Switch } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { fetchUsers } from 'store/user/actions'
import { fetchActiveDanceSession } from 'store/dance/actions'
import Home from 'main/Home'
import Analytics from 'main/Analytics'

import * as routes from './routes'

type Props = CombinedProps<() => {}, typeof mapDispatchToProps>

const AppRouter: FC<Props> = ({ fetchUsers, fetchActiveDanceSession }) => {
  // Maybe it's not very good to put it here?
  const loadInitialData = () => {
    fetchUsers()
    fetchActiveDanceSession()
  }

  React.useEffect(loadInitialData, [])

  return (
    <Switch>
      <Route exact path={routes.MAIN} component={Home} />
      <Route path={routes.ANALYTICS} component={Analytics} />
    </Switch>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchUsers: fetchUsers,
      fetchActiveDanceSession: fetchActiveDanceSession,
    },
    dispatch,
  )

export default connect(null, mapDispatchToProps)(AppRouter)
