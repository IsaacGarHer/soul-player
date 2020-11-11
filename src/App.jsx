import React, { Fragment, useState } from 'react'
import { ROUTES } from './global/jsx'
import { MusicDataConsumer } from './context/music-data-context'
import Player, { PlayerDataConsumer } from './context/player-data-context'

import './App.sass'

import Sidebar from './components/common/sidebar'
import Home from './components/windows/home'
import Songs from './components/windows/songs'
import Artists from './components/windows/artists'
import Uploader from './components/panels/uploader'

const AppPreview = ( ) => {

  const [ window, setWindow ] = useState( ROUTES[ 0 ] )

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
        window = { window }/>
      <Artists/>
      <Sidebar
        windowChanger = { windowChanger }
        window = { window }
        setWindow = { setWindow }/>
      <Uploader />
      <Player />
    </Fragment>  
  )
}

const AppPlayerPrebiew = PlayerDataConsumer( AppPreview )
const App = MusicDataConsumer( AppPlayerPrebiew )

export default App