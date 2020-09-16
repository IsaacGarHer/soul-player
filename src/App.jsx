import React, { Fragment, useState } from 'react'
import { ROUTES } from './global/jsx'
import './App.sass'

import Header from './components/common/header'
import Home from './components/windows/home'
import Songs from './components/windows/songs'
import UploadSongs from './components/panels/upload-songs'

const App = ( ) => {

  const [ window, setWindow ] = useState( ROUTES[ 0 ] )
  const [ songs, setSongs ] = useState([ ])

  const main = [
    <Home
      songs = { songs }/>,
    <Songs
      songs = { songs }/>,
    <Songs />,
    <Songs />,
    <Songs />
  ]

  return (
    <Fragment>
      <Header window = { window } setWindow = { setWindow }/>
      { ROUTES.map(( route, i ) => (
        <Fragment key = { i }>
          { window === route ? main[ i ] : null }
        </Fragment>
      )) }
      <UploadSongs setSongs = { setSongs } />
    </Fragment>
  )
}

export default App