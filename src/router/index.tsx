import React, { FC } from 'react'
import { Route, Switch } from 'react-router'

import configureAxios from 'configs/api'
import Home from 'main/Home'
import Analytics from 'main/Analytics'

import * as routes from './routes'

const AppRouter: FC<{}> = () => {
  const loadInitialData = () => {
    configureAxios()
  }
  React.useEffect(loadInitialData, [])

  return (
    <Switch>
      <Route exact path={routes.MAIN} component={Home} />
      <Route path={routes.ANALYTICS} component={Analytics} />
    </Switch>
  )
}

export default AppRouter
