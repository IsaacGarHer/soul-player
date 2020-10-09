import React, { Fragment, useState } from 'react'
import { ROUTES } from './global/jsx'
import './App.sass'

import Sidebar from './components/common/sidebar'
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

  const windowChanger = i => {
    let scroll_container = document.getElementById( 'scroller' )
    let height = document.body.clientHeight

    scroll_container.scroll({
      top: height * i,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div id = 'scroller'>
      <Home/>
      <Songs
        albums = { albums }
        songs = { songs }/>
      <Artists/>
      <Sidebar
        windowChanger = { windowChanger }
        window = { window }
        setWindow = { setWindow }/>
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
    </div>
  )
}

export default App