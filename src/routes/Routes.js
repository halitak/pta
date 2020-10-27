import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Role from './Role'
import Member from './Member'
import Team from './Team'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/role" component={Role} />
      <Route exact path="/member" component={Member} />
      <Route exact path="/team" component={Team} />
    </Switch>
  )
}

export default Routes
