import React, { Fragment, useState } from 'react'
import { ROUTES } from './global/jsx'
import './App.sass'

import Header from './components/common/header'
import Home from './components/windows/home'
import Songs from './components/windows/songs'
import Artists from './components/windows/artists'
import UploadSongs from './components/panels/upload-songs'

const App = ( ) => {

  const [ window, setWindow ] = useState( ROUTES[ 0 ] )
  const [ songs, setSongs ] = useState([ ])
  const [ lyrics, setLyrics ] = useState([ ])
  const [ albums, setAlbums ] = useState([ ])
  const [ artists, setArtists ] = useState([ ])

  const main = [
    <Home
      songs = { songs }/>,
    <Songs
      songs = { songs }/>,
    <Artists />,
    <Songs />,
    <Songs />
  ]

  ( async ( ) => {

  })()

  return (
    <Fragment>
      <Header window = { window } setWindow = { setWindow }/>
      { ROUTES.map(( route, i ) => (
        <Fragment key = { i }>
          { window === route ? main[ i ] : null }
        </Fragment>
      ))}
      <UploadSongs
        setSongs = { setSongs}
        setLyrics = { setLyrics }
        setArtists = { setArtists }
        setAlbums = { setAlbums } />
    </Fragment>
  )
}

export default App