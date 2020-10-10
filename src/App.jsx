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
  const [ artists, setArtists ] = useState([ ])

  const windowChanger = i => {
    let scroll_container = document.getElementById( 'root' )
    let height = document.body.clientHeight

    scroll_container.scroll({
      top: height * i,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Fragment>
      <Home/>
      <Songs
        songs = { songs }
        window = { window }/>
      <Artists/>
      <Sidebar
        windowChanger = { windowChanger }
        window = { window }
        setWindow = { setWindow }/>
      <DataSetup
        songs = { songs }
        setSongs = { setSongs }/>
      <Uploader
        setSongs = { setSongs}
        setLyrics = { setLyrics }
        setArtists = { setArtists }/>
      <Player
        lyrics = { lyrics }
        artists = { artists }/>
    </Fragment>
  )
}

export default App