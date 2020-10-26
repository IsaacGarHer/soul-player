import React, { Fragment, useState } from 'react'
import { ROUTES } from './global/jsx'
import './App.sass'

import Sidebar from './components/common/sidebar'
import Home from './components/windows/home'
import Songs from './components/windows/songs'
import Artists from './components/windows/artists'
import Uploader from './components/panels/uploader'
import Player from './components/panels/player'

const App = ( ) => {

  const [ window, setWindow ] = useState( ROUTES[ 0 ] )
  const [ songs, setSongs ] = useState([ ])
  const [ lyrics, setLyrics ] = useState([ ])
  const [ artists, setArtists ] = useState([ ])
  const [ listening, setListening ] = useState( null )
  const [ player_visibility, setPlayerVisibility ] = useState( false )
  const [ listening_lyrics, setListeningLyrics ] = useState([ ])
  const [ is_playing, setIsPlaying ] = useState( false )

  const windowChanger = i => {
    let scroll_container = document.getElementById( 'root' )
    let height = document.body.clientHeight

    scroll_container.scroll({
      top: height * i,
      left: 0,
      behavior: 'smooth'
    })
  }

  const lyricsStape = ( path, song ) => {
    let paths = path.split( '.' )
    paths[ 1 ] = 'lrc'
    path = paths.join( '.' )

    let lyrics_file = new FileReader( )
    lyrics_file.onload = e => {
      let content = e.target.result
      let new_lyrics = [ ]
      content = content.split( '\n' )
      content.splice( 0, 6 )
      content.splice( content.length - 2, 1 )
      content.splice( content.length - 1, 1 )
      for ( let i = 0; i < content.length; i++ ) {
        if ( content[ i ].length > 11 )
          new_lyrics.push({
            time: content[ i ].substring( 1, 9 ),
            text: content[ i ].substring( 11, content[ i ].length )
          })
        else
          new_lyrics.push({
            time: content[ i ].substring( 1, 9 ),
            text: ' '
          })
      }
      new_lyrics.forEach( nl => {
        nl.time = Math.round(( Number( nl.time.substring( 3, 8 )) + Number( nl.time.substring( 0, 2 )) * 60 ) * 100 ) / 100
      })
      setIsPlaying( true )
      setListeningLyrics( new_lyrics )
      setListening( song )
    }
    lyrics_file.readAsText( lyrics[ lyrics.findIndex( lyric => lyric.path === path )])
  }

  return (
    <Fragment>
      <Home/>
      <Songs
        songs = { songs }
        window = { window }
        lyricsStape = { lyricsStape }/>
      <Artists/>
      <Sidebar
        windowChanger = { windowChanger }
        window = { window }
        setWindow = { setWindow }
        setPlayerVisibility = { setPlayerVisibility }
        player_visibility = { player_visibility }/>
      <Uploader
        setSongs = { setSongs}
        setLyrics = { setLyrics }
        setArtists = { setArtists }/>
      <Player
        artists = { artists }
        listening = { listening }
        listening_lyrics = { listening_lyrics }
        player_visibility = { player_visibility }
        is_playing = { is_playing }
        setIsPlaying = { setIsPlaying }/>
    </Fragment>
  )
}

export default App