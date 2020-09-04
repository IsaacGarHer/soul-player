import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.sass'

import Header from './components/common/header'

const App = ( ) => {
  return (
    <Fragment>
      <Switch>
        <Route path = '/' component = { Header }/>
      </Switch>
    </Fragment>
  )
}

export default App