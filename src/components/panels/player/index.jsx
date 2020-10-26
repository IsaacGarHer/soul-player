import React, { Fragment, useState } from 'react'
import './index.sass'

import IconButton from '../../common/icon-button'

import test_gray from '../../../resources/icons/test-gray.svg'
import test_white from '../../../resources/icons/test-white.svg'

const Player = ({ artists, listening, listening_lyrics, player_visibility, is_playing, setIsPlaying }) => {

  const [ gradient_value, setGradientValue ] = useState( 0 )
  const [ time, setTime ] = useState( 0 )

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

  const puaseMusic = ( ) => {
    document.getElementById( 'mp3-player' ).pause( )
    setIsPlaying( false )
  }

  const playMusic = ( ) => {
    document.getElementById( 'mp3-player' ).play( )
    setIsPlaying( true )
  }

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
            onEnded = {( ) => setIsPlaying( false ) }
            onTimeUpdate = { e => updateRangeValue( e.target.currentTime, listening.duration )}/>
          <div className = 'player-top'>
            <div className = 'player-top-left'>
              <div className = 'player-info'>
                <div className = 'song-info'>
                  <div className = 'song-info-left'>
                    <span className = 'song-info-text'>{ listening.meta.title }</span>
                    <span className = 'song-info-text'>{ `${ listening.meta.artists.map( artist => artist ) }   |   ${ listening.meta.album }` }</span>
                  </div>
                  <img src = { listening.cover } alt = 'test'/>
                </div>
                <div className = 'next-song'>

                </div>
              </div>
              <div className = 'lyrics-area'>
                <span id = 'listening-lyrics'/>
                <span id = 'listening-lyrics-01' className = 'next-lyric'/>
                <span id = 'listening-lyrics-02' className = 'next-lyric'/>
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
                  alt = { 'favorites' }
                  title = 'Favoritos'/>
                <img
                  className = 'test-icon'
                  src = { test_gray }
                  alt = { 'equalizer' }
                  title = 'Ecualizador'/>
              </div>
              <div className = 'controls-center'>
                <img
                  className = 'test-icon'
                  src = { test_gray }
                  alt = { 'before' }
                  title = 'Anterior'/>
                <IconButton
                  icon = { is_playing ? test_gray : test_white }
                  alt = 'play/puse'
                  title = 'play/puse'
                  tab = '1'
                  action = {( ) => is_playing ? puaseMusic( ) : playMusic( )}/>
                <img
                  className = 'test-icon'
                  src = { test_gray }
                  alt = { 'next' }
                  title = 'Siguiente'/>
              </div>
              <div className = 'controls-right'>
                <img
                  className = 'test-icon'
                  src = { test_gray }
                  alt = { 'shuffle' }
                  title = 'Azar'/>
                <img
                  className = 'test-icon'
                  src = { test_gray }
                  alt = { 'repeat' }
                  title = 'Repetir'/>
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