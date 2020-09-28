import React, { FC } from 'react'
import { Route, Switch } from 'react-router'

import Home from 'main/Home'
import Analytics from 'main/Analytics'

import * as routes from './routes'

const AppRouter: FC<{}> = () => {
  return (
    <Switch>
      <Route exact path={routes.MAIN} component={Home} />
      <Route path={routes.ANALYTICS} component={Analytics} />
    </Switch>
  )
}

export default AppRouter
