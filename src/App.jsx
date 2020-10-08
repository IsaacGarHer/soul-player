import React, { Fragment, useState } from 'react'
import { ROUTES } from './global/jsx'
import './App.sass'

import Header from './components/common/header'
import Home from './components/windows/home'
import Songs from './components/windows/songs'
import Artists from './components/windows/artists'
import Uploader from './components/panels/uploader'
import Player from './components/panels/player'
import DataSetup from './components/panels/data-setup'

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

  return (
    <Fragment>
      <Header window = { window } setWindow = { setWindow }/>
      { ROUTES.map(( route, i ) => (
        <Fragment key = { i }>
          { window === route ? main[ i ] : null }
        </Fragment>
      ))}
      <DataSetup
        songs = { songs }
        setSongs = { setSongs }
        albums = { albums }
        setAlbums = { setAlbums }/>
      <Uploader
        setSongs = { setSongs}
        setLyrics = { setLyrics }
        setArtists = { setArtists }
        setAlbums = { setAlbums } />
      <Player
        lyrics = { lyrics }
        albums = { albums }
        artists = { artists }/>
    </Fragment>
  )
}

export default App