import React, { Fragment, useState } from 'react'
import { ROUTES } from './global/jsx'
import './App.sass'

import Header from './components/common/header'
import Home from './components/windows/home'
import Songs from './components/windows/songs'

const App = ( ) => {

  const [ window, setWindow ] = useState( ROUTES[ 0 ] )

  const main = [
    <Home />,
    <Songs />,
    <Songs />,
    <Songs />,
    <Songs />
  ]

  return (
    <Fragment>
      <Header window = { window } setWindow = { setWindow }/>
      { ROUTES.map(( route, i ) => (
        window === route ? main[ i ] : null
      )) }
    </Fragment>
  )
}

export default App