import React, { Fragment, useState } from 'react'
import { ROUTES } from './global/jsx'
import { MusicDataConsumer } from './context/music-data-context'
import { PlayerDataConsumer } from './context/player-data-context'

import './App.sass'

import Sidebar from './components/common/sidebar'
import Home from './components/windows/home'
import Songs from './components/windows/songs'
import Artists from './components/windows/artists'
import Uploader from './components/panels/uploader'
import Player from './components/panels/player'

const AppPreview = ( ) => {

  const [ window, setWindow ] = useState( ROUTES[ 0 ] )
  const [ songs, setSongs ] = useState([ ])
  const [ lyrics, setLyrics ] = useState([ ])
  const [ artists, setArtists ] = useState([ ])
  const [ listening, setListening ] = useState( null )
  const [ player_visibility, setPlayerVisibility ] = useState( false )
  const [ listening_lyrics, setListeningLyrics ] = useState([ ])
  const [ listening_artists, setListeningArtists ] = useState([ ])
  const [ playlist, setPlaylist ] = useState([ ])
  const [ is_playing, setIsPlaying ] = useState( false )
  const [ repeat, setRepeat ] = useState( 0 )

  const windowChanger = i => {
    let scroll_container = document.getElementById( 'root' )
    let height = document.body.clientHeight

    scroll_container.scroll({
      top: height * i,
      left: 0,
      behavior: 'smooth'
    })
  }

  const lyricsStep = ( song, new_song ) => {
    let parts_name = song.name.split( '.' )
    parts_name[ 1 ] = 'lrc'
    let lyric_name = parts_name.join( '.' )

    let lyrics_file = new FileReader( )
    lyrics_file.onload = e => {
      let content = e.target.result
      let new_lyrics = [ ]
      content = content.split( '\n' )
      content.splice( 0, 6 )
      content.splice( content.length - 2, 1 )
      content.splice( content.length - 1, 1 )
      for ( let i = 0; i < content.length; i++ ) {
        if ( content[ i ] !== undefined ) {
          if ( content[ i ].charAt( 0 ) === '[' ) {
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
          } else {
            new_lyrics[ new_lyrics.length - 1 ].text += `\n${ content[ i ] }`
            content.splice( i, 1 )
            i--
          }
        }
      }
      new_lyrics.forEach( nl => {
        nl.time = Math.round(( Number( nl.time.substring( 3, 8 )) + Number( nl.time.substring( 0, 2 )) * 60 ) * 100 ) / 100
      })

      let new_listening_artists = [ ]
      song.meta.artists.forEach( song_artist => {
        new_listening_artists.push( artists[ artists.findIndex( art => art.title === song_artist ) ] )
      })
      setListeningArtists( new_listening_artists )

      if ( new_song )
        setPlaylist([ song ])
      setIsPlaying( true )
      setListeningLyrics( new_lyrics )
      setListening( song )
    }
    lyrics_file.readAsText( lyrics[ lyrics.findIndex( lyric => lyric.name === lyric_name )])
  }

  const removeSong = song => {
    let i = playlist.findIndex( song_pls => song_pls.meta.title === song.meta.title )
    if ( i > -1 && listening.meta.title !== playlist[ i ].meta.title ) {
      playlist.splice( i, 1 )
      setPlaylist( playlist )
    }
  }

  return (
    <Fragment>
      <Home/>
      <Songs
        songs = { songs }
        window = { window }
        lyricsStep = { lyricsStep }
        setPlaylist = { setPlaylist }
        removeSong = { removeSong }/>
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
        listening_artists = { listening_artists }
        listening = { listening }
        listening_lyrics = { listening_lyrics }
        player_visibility = { player_visibility }
        is_playing = { is_playing }
        setIsPlaying = { setIsPlaying }
        playlist = { playlist }
        lyricsStep = { lyricsStep }
        repeat = { repeat }
        setRepeat = { setRepeat }/>
    </Fragment>  
  )
}

const AppPlayer = PlayerDataConsumer( AppPreview )
const App = MusicDataConsumer( AppPlayer )

export default App