import React, { Fragment } from 'react'
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
      
    </Fragment>
  )
}

export default App