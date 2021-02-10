import React, { Fragment, useState } from 'react'
import './index.sass'

import IconButton from '../../common/icon-button'
import Card from '../../common/card'

import test_gray from '../../../resources/icons/test-gray.svg'
import test_white from '../../../resources/icons/test-white.svg'

const Player = ({ listening_artists, listening, listening_lyrics, player_visibility, is_playing, setIsPlaying, playlist, lyricsStep, repeat, setRepeat }) => {

  const [ gradient_value, setGradientValue ] = useState( 0 )
  const [ time, setTime ] = useState( 0 )
  const [ visible_playlist, setVisiblePlaylist ] = useState( false )
  const [ visible_all_artists, setVisibleAllArtists ] = useState( false )
  const [ volume_control_viibility, setVolumeControlVisibility ] = useState( false )

  /*const getArtistCanvasImage = ( ) => {
    let artist_canvas = document.getElementsByClassName( 'artists-canvas' )
    let ctx = new Array( artist_canvas.length )
    let img = new Array( artist_canvas.length )
    //console.log( artist_canvas )
    for( let i = 0; i < artist_canvas.length; i++ ) {
      ctx[ i ] = artist_canvas[ i ].getContext( '2d' )
      console.log( listening.meta.artists[ i ] )
      img[ i ] = new Image( )
      let index = artists.findIndex( art => {
        let name = art.name.split( '.jpg' )
        return name[ 0 ] === listening.meta.artists[ i ]
      })
      console.log( index )
      console.log( artists )
      img[ i ].src = artists[ index ].URI
      console.log( img[ i ].src )
      artist_canvas[ i ].height = artist_canvas[ i ].width = 250
      ctx[ i ].drawImage( img[ i ], 0, 0, artist_canvas[ i ].width, artist_canvas[ i ].height )
    }
  }*/

  const toTimeFormat = time => {
    let hours, minutes, seconds, result = ''
    if ( time > 3600 ){
      hours = Math.floor( time / 3600 )
      time = time % 3600
      result = `${ hours }:`
    } if ( time > 60 ){
      minutes = Math.floor( time / 60 )
      time = time % 60
      result = `${ result }${ minutes < 10 ? `0${ minutes }` : minutes }:`
    }
    seconds = Math.round( time )
    result = `${ result }${ minutes === undefined ? '00:' : '' }${ seconds < 10 ? `0${ seconds }` : seconds }`
    return result
  }

  const changeSong = next => {
    if ( playlist.length > 0 ) {
      let index = playlist.findIndex( song => song.meta.title === listening.meta.title )
      if ( index > -1 ) {
        if ( next ) {
          if ( index === playlist.length - 1 )
            lyricsStep( playlist[ 0 ], false )
          else
            lyricsStep( playlist[ index + 1 ], false )
        } else {
          console.log( index )
          if ( index === 0 )
            lyricsStep( playlist[ playlist.length - 1 ], false )
          else
            lyricsStep( playlist[ index - 1 ], false )
        }
      }
    }
  }

  const updateRangeValue = ( ct, duration ) => {
    document.getElementById( 'song-time-slider' ).value = ct * 100 / duration
    let position
    if ( listening_lyrics.length > 0 ) {
      for ( let i = 0; i < listening_lyrics.length; i++ ) {
        if (  ct >= listening_lyrics[ i ].time )
          position = i
        else
          break
      }
      document.getElementById( 'listening-lyrics' ).innerText = listening_lyrics[ position ].text
      document.getElementById( 'listening-lyrics-01' ).innerText = listening_lyrics[ position + 1 ] !== undefined ? listening_lyrics[ position + 1 ].text : ''
      document.getElementById( 'listening-lyrics-02' ).innerText = listening_lyrics[ position + 2 ] !== undefined ? listening_lyrics[ position + 2 ].text : ''
    }
    setGradientValue( Math.round(( ct * 100 / duration ) * 100 ) / 100 )
    setTime( toTimeFormat( ct ))
  }

  const updateAudioTime = ( target, duration, click ) =>{
    document.getElementById( 'mp3-player' ).currentTime = target.value * duration / 100
    setGradientValue( target.value )
    setTime( toTimeFormat( target.value * duration / 100 ))
    if ( click )
      target.blur( )
  }

  const toEnd = ( ) => {
    setIsPlaying( false )
    if ( playlist.length > 0 ){
      let index = playlist.findIndex( song => song.name === listening.name )
      if ( repeat === 0 )
        if ( index < playlist.length - 1 )
          lyricsStep( playlist[ index + 1 ], false )
      if ( repeat === 1 ){
        if ( index < playlist.length - 1 )
          lyricsStep( playlist[ index + 1 ], false )
        else
          lyricsStep( playlist[ 0 ], false )
      }
      if ( repeat === 2 ) {
        document.getElementById( 'mp3-player' ).play( )
        setIsPlaying( true )
      }
    }
  }

  const puaseMusic = ( ) => {
    document.getElementById( 'mp3-player' ).pause( )
    setIsPlaying( false )
  }

  const playMusic = ( ) => {
    document.getElementById( 'mp3-player' ).play( )
    setIsPlaying( true )
  }

  const getArtist = ( ) => listening_artists[ 0 ].URI

  const css = `
    #song-time-slider::-webkit-slider-runnable-track {
      background: linear-gradient( to right, #3739ed ${ gradient_value }%, #fff ${ gradient_value }% );
    }
  `

  return (
    <div className = { `player${ player_visibility ? ' visible' : ' hidden' }` }>
      { listening !== null ?
        <Fragment>
          <style>{ css }</style>
          <audio
            src = { listening.URI }
            tabIndex = '-1'
            className = 'audio-player'
            id = 'mp3-player'
            autoPlay
            onEnded = {( ) => toEnd( ) }
            onTimeUpdate = { e => updateRangeValue( e.target.currentTime, listening.duration )}/>
          <div className = 'player-top'>
            <div className = 'player-top-left'>
              <div className = 'player-info'>
                <div className = 'song-info'>
                  <div className = 'song-info-left'>
                    <span className = 'song-info-text'>{ listening.meta.title }</span>
                    <span className = 'song-info-text'>{ `${ listening.meta.artists.map( artist => artist ) }   |   ${ listening.meta.album }` }</span>
                  </div>
                  <div className = 'song-info-artists-top-part'>
                    { listening_artists.length > 0 ? <img src = { getArtist( )} alt = 'test'/> : <img src = { test_gray } alt = 'test'/>  }
                    <button
                      className = 'all-artists-btn'
                      onClick = { e => {
                        setVisibleAllArtists( !visible_all_artists )
                        e.target.blur( )
                      }}>
                      <img
                        src = { test_white }
                        alt = 'artistas'
                        title = 'Artistsas'/>
                    </button>
                  </div>
                </div>
                <div className = 'next-song'>
                  { playlist.length > 1 ?
                    <img
                      className = 'next-song-cover'
                      src = { playlist[ playlist.length - 1 === playlist.findIndex( song => song.name === listening.name ) ? 0 : playlist.findIndex( song => song.name === listening.name ) + 1 ].cover }
                      alt = 'siguiente'/>
                    :
                    <img
                      className = 'next-song-cover'
                      src = { listening.cover }
                      alt = 'no hay siguiente'/> }
                  <button
                    className = 'show-playlist'
                    onClick = { e => {
                      setVisiblePlaylist( !visible_playlist )
                      e.target.blur( )
                    }}>
                    <img
                      src = { test_white }
                      alt = 'ver'/>
                  </button>
                </div>
              </div>
              <div className = 'lyrics-area'>
                <p id = 'listening-lyrics'/>
                <p id = 'listening-lyrics-01' className = 'next-lyric'/>
                <p id = 'listening-lyrics-02' className = 'next-lyric'/>
                <div className = { `playlist ${ visible_playlist && player_visibility ? 'visible' : 'hidden' }` }>
                  { playlist.map(( song, i ) => (
                    <div
                      className = { `playlist-song${ song.meta.title === listening.meta.title && song.meta.album === listening.meta.album ? ' listening' : '' }` }
                      key = { i }>
                        <img
                          className = 'playlist-song-cover'
                          src = { song.cover }
                          alt = { song.meta.album }/>
                        <div className = 'playlist-song-info'>
                          <span>{ song.meta.title }</span>
                          <span>{ `${ song.meta.artists.map( artist => artist )}` }</span>
                        </div>
                        <span className = 'playlist-song-number'>{ i + 1 }</span>
                        <button
                          className = 'player-song-selector'
                          tabIndex = { visible_playlist ? '1' : '-1' }
                          onClick = { e => {
                            lyricsStep( song, false )
                            e.target.blur( )
                          }}/>
                    </div>
                  ))}
                </div>
                <div className = { `artists-viewer ${ visible_all_artists && player_visibility ? 'visible' : 'hidden' }` }>
                  { listening_artists.map(( artist, i ) => (
                    <Card
                      key = { i }
                      image = { artist.URI }
                      alt = {[ artist.title ]}
                      info = {[ artist.title ]}
                      action = {( ) => console.log( 'to after' )}/>
                  ))}
                </div>
              </div>
            </div>
            <div className = 'player-top-right'>
              <img
                className = 'player-song-cover'
                src = { listening.cover }
                alt = { listening.meta.album }/>
            </div>
          </div>
          <div className = 'player-bottom'>
            <div className = 'progress-bar'>
              <span className = 'time-show'>{ `${time} / ${ listening.durationTimeFormat }` }</span>
              <input
                type = 'range'
                min = '0'
                max = '100'
                step = '0.1'
                id = 'song-time-slider'
                onChange = { e => updateAudioTime( e.target, listening.duration, false ) }
                onClick = { e => updateAudioTime( e.target, listening.duration, true ) }
                className = 'song-time-slider'/>
            </div>
            <div className = 'player-controls'>
              <div className = 'controls-left'>
                <img
                  className = 'test-icon'
                  src = { test_gray }
                  alt = { 'equalizer' }
                  title = 'Ecualizador'/>
                <IconButton
                  class = { `volume-control ${ volume_control_viibility ? 'active' : 'disable' }` }
                  icon = { volume_control_viibility ? test_gray : test_white }
                  alt = { 'control de volumen' }
                  title = 'Volumen'
                  tab = '1'
                  action = {( ) => setVolumeControlVisibility( !volume_control_viibility )}/>
              </div>
              <div className = 'controls-center'>
                <IconButton
                  icon = { test_gray }
                  class = 'change-song-plr'
                  alt = 'anterior'
                  title = 'anterior'
                  tab = '1'
                  action = {( ) => changeSong( false )}/>
                <IconButton
                  icon = { is_playing ? test_gray : test_white }
                  alt = 'play/puse'
                  title = 'play/puse'
                  tab = '1'
                  action = {( ) => is_playing ? puaseMusic( ) : playMusic( )}/>
                <IconButton
                  icon = { test_gray }
                  class = 'change-song-plr'
                  alt = 'siguiente'
                  title = 'siguiente'
                  tab = '1'
                  action = {( ) => changeSong( true )}/>
              </div>
              <div className = 'controls-right'>
                <IconButton
                  class = { `repeat-${ repeat }` }
                  icon = { repeat === 0 ? test_gray : test_white }
                  alt = 'no repetir/uno/todos'
                  title = 'no repetir/uno/todos'
                  tab = '1'
                  action = {( ) => setRepeat( repeat === 0 ? 1 : repeat === 1 ? 2 : 0 )}/>
                <img
                  className = 'test-icon'
                  src = { test_gray }
                  alt = { 'shuffle' }
                  title = 'Azar'/>
              </div>
            </div>
          </div>
        </Fragment>
        :
        <Fragment />
        }
    </div>
  )
}

export default Player