import React, { Fragment } from 'react'
import PlayerDataContext from './Context'

import Card from '../../components/common/card'
import IconButton from '../../components/common/icon-button'

import './index.sass'

import test_gray from '../../resources/icons/test-gray.svg'
import test_white from '../../resources/icons/test-white.svg'

const PlayerDataConsumer = Component => pr => (
  <PlayerDataContext.Consumer>
    { player_data => <Component { ...pr } player_data = { player_data }/> }
  </PlayerDataContext.Consumer>
)

const Player = ( ) => (
    <PlayerDataContext.Consumer>
      { player_data =>
        player_data.listening !== null ? 
        <Fragment>
          <style>{ player_data.css }</style>
          <div className = { `player ${ player_data.player_visibility ? 'viible' : 'hidden' }` }>
            <audio
              src = { player_data.listening.URI }
              tabIndex = '-1'
              className = 'audio-player'
              id = 'mp3-player'
              autoPlay
              onEnded = {( ) => player_data.toEnd( ) }
              onTimeUpdate = { e => player_data.updateRangeValue( e.target.currentTime, player_data.listening.duration )}/>
            <div className = 'player-top'>
              <div className = 'player-top-left'>
                <div className = 'player-info'>
                  <div className = 'song-info'>
                    <div className = 'song-info-left'>
                      <span className = 'song-info-text'>{ player_data.listening.meta.title }</span>
                      <span className = 'song-info-text'>{ `${ player_data.listening.meta.artists.map( artist => artist ) } | ${ player_data.listening.meta.album }` }</span>
                    </div>
                    <div className = 'song-info-artists-top-part'>
                      <img src = { player_data.listening_artists.length > 0 ? player_data.getArtist( ) : test_gray } alt = 'test'/>
                      <button
                        className = 'all-artists-btn'
                        onClick = { e => {
                          player_data.setAllArtistsVisibility( !player_data.all_artists_visibility )
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
                    { player_data.playlist.length > 1 ?
                      <img
                        className = 'next-song-cover'
                        src = { player_data.playlist[ player_data.playlist.length - 1 === player_data.playlist.findIndex( song => song.name === player_data.listening.name ) ? 0 : player_data.playlist.findIndex( song => song.name === player_data.listening.name ) + 1 ].cover }
                        alt = 'siguiente'/>
                      :
                      <img
                        className = 'next-song-cover'
                        src = { player_data.listening.cover }
                        alt = 'no hay siguiente'/> }
                    <button
                      className = 'show-playlist'
                      onClick = { e => {
                        player_data.setPlaylistVisibility( !player_data.playlist_visibility )
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
                  <div className = { `playlist ${ player_data.playlist_visibility && player_data.player_visibility ? 'visible' : 'hidden' }` }>
                    { player_data.playlist.map(( song, i ) => (
                      <div
                        className = { `playlist-song${ song.meta.title === player_data.listening.meta.title && song.meta.album === player_data.listening.meta.album ? ' listening' : '' }` }
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
                            tabIndex = { player_data.playlist_visibility ? '1' : '-1' }
                            onClick = { e => {
                              player_data.beforePlaying( song, false )
                              e.target.blur( )
                            }}/>
                      </div>
                    ))}
                  </div>
                  <div className = { `artists-viewer ${ player_data.all_artists_visibility && player_data.player_visibility ? 'visible' : 'hidden' }` }>
                    { player_data.listening_artists.map(( artist, i ) => (
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
                  src = { player_data.listening.cover }
                  alt = { player_data.listening.meta.album }/>
              </div>
            </div>
            <div className = 'player-bottom'>
              <div className = 'progress-bar'>
                <span className = 'time-show'>{ `${player_data.time} / ${ player_data.listening.durationTimeFormat }` }</span>
                <input
                  type = 'range'
                  min = '0'
                  max = '100'
                  step = '0.1'
                  id = 'song-time-slider'
                  onChange = { e => player_data.updateAudioTime( e.target, player_data.listening.duration, false ) }
                  onClick = { e => player_data.updateAudioTime( e.target, player_data.listening.duration, true ) }
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
                  <IconButton
                    icon = { test_gray }
                    class = 'change-song-plr'
                    alt = 'anterior'
                    title = 'anterior'
                    tab = '1'
                    action = {( ) => player_data.changeSong( false )}/>
                  <IconButton
                    icon = { player_data.is_playing ? test_gray : test_white }
                    alt = 'play/puse'
                    title = 'play/puse'
                    tab = '1'
                    action = {( ) => player_data.is_playing ? player_data.puaseMusic( ) : player_data.playMusic( )}/>
                  <IconButton
                    icon = { test_gray }
                    class = 'change-song-plr'
                    alt = 'siguiente'
                    title = 'siguiente'
                    tab = '1'
                    action = {( ) => player_data.changeSong( true )}/>
                </div>
                <div className = 'controls-right'>
                  <IconButton
                    class = { `repeat-${ player_data.repeat }` }
                    icon = { player_data.repeat === 0 ? test_gray : test_white }
                    alt = 'no repetir/uno/todos'
                    title = 'no repetir/uno/todos'
                    tab = '1'
                    action = {( ) => player_data.setRepeat( player_data.repeat === 0 ? 1 : player_data.repeat === 1 ? 2 : 0 )}/>
                  <img
                    className = 'test-icon'
                    src = { test_gray }
                    alt = { 'shuffle' }
                    title = 'Azar'/>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
        :
        <div style = {{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '50vw',
          height: '100vh',
          background: '#000',
          visibility: player_data.player_visibility ? 'visible' : 'hidden'
        }}/>
      }
    </PlayerDataContext.Consumer>
)

export { Player }
export default PlayerDataConsumer