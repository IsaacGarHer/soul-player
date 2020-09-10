import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ROUTES } from './global/jsx'
import './App.sass'

import Header from './components/common/header'
import Home from './components/windows/home'
import Songs from './components/windows/songs'

const App = ( ) => {

  const routesProperties = [
    {
      path: ROUTES.HOME,
      component: <Home />
    },
    {
      path: ROUTES.SONGS,
      component: <Songs />
    }
  ]

  return (
    <Fragment>
      <Switch>
        { routesProperties.map(( element, i ) => (
          <Route
            exact
            path = { element.path }
            key = { i }
            component = {
              ( ) =>
                <Fragment>
                  <Header />
                  { element.component }
                </Fragment>
            }/>
        )) }
      </Switch>
    </Fragment>
  )
}

export default App