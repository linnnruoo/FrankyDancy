import React, { FC } from 'react'
import { Route, Switch } from 'react-router'
import { bindActionCreators, Dispatch } from 'redux'
import { fetchUsers } from 'store/user/actions'
import { connect } from 'react-redux'

import Home from 'main/Home'
import Analytics from 'main/Analytics'

import * as routes from './routes'

type Props = CombinedProps<() => {}, typeof mapDispatchToProps>

const AppRouter: FC<Props> = ({ fetchUsers }) => {
  // Maybe it's not very good to put it here?
  const loadInitialData = () => {
    fetchUsers()
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
    },
    dispatch,
  )

export default connect(null, mapDispatchToProps)(AppRouter)
