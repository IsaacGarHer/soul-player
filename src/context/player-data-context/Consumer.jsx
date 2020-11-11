import React, { Fragment } from react
import PlayerDataContext from './Context'

import './index.sass'

import test_gray from '../../../resources/icons/test-gray.svg'
import test_white from '../../../resources/icons/test-white.svg'

const PlayerDataConsumer = Component  => pr => (
  <PlayerDataContext.Consumer>
    { data => <Component { ...pr } data = { data }/>}
  </PlayerDataContext.Consumer>
)

const Player = ( ) => (
    <PlayerDataContext.Consumer>
      { data =>
        <Fragment>
          <style>{ data.css }</style>
          <div className = { `player ${ data.player_visibility ? 'viible' : 'hidden' }` }>
            <audio
              src = { data.listening.URI }
              tabIndex = '-1'
              className = 'audio-player'
              id = 'mp3-player'
              autoPlay
              onEnded = {( ) => data.toEnd( ) }
              onTimeUpdate = { e => data.updateRangeValue( e.target.currentTime, data.listening.duration )}/>
            <div className = 'player-top'>
              <div className = 'player-top-left'>
                <div className = 'player-info'>
                  <div className = 'song-info'>
                    <div className = 'song-info-left'>
                      <span className = 'song-info-text'>{ data.listening.meta.title }</span>
                      <span className = 'song-info-text'>{ `${ data.listening.meta.artists.map( artist => artist ) } | ${ data.listening.meta.album }` }</span>
                    </div>
                    <div className = 'song-info-artists-top-part'>
                      <img src = { data.listening_artists.length > 0 ? data.getArtist( ) : test_gray } alt = 'test'/>
                      <button
                        className = 'all-artists-btn'
                        onClick = { e => {
                          data.setAllArtistsVisibility( !data.all_artists_visibility )
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
                    { data.playlist.length > 1 ?
                      <img
                        className = 'next-song-cover'
                        src = { data.playlist[ data.playlist.length - 1 === data.playlist.findIndex( song => song.name === data.listening.name ) ? 0 : data.playlist.findIndex( song => song.name === data.listening.name ) + 1 ].cover }
                        alt = 'siguiente'/>
                      :
                      <img
                        className = 'next-song-cover'
                        src = { data.listening.cover }
                        alt = 'no hay siguiente'/> }
                    <button
                      className = 'show-playlist'
                      onClick = { e => {
                        data.setPlaylistVisibility( !data.playlist_visibility )
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
                  <div className = { `playlist ${ data.playlist_visibility && data.player_visibility ? 'visible' : 'hidden' }` }>
                    { data.playlist.map(( song, i ) => (
                      <div
                        className = { `playlist-song${ song.meta.title === data.listening.meta.title && song.meta.album === data.listening.meta.album ? ' listening' : '' }` }
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
                            tabIndex = { playlist_visibility ? '1' : '-1' }
                            onClick = { e => {
                              data.beforePlaying( song, false )
                              e.target.blur( )
                            }}/>
                      </div>
                    ))}
                  </div>
                  <div className = { `artists-viewer ${ data.all_artists_visibility && data.player_visibility ? 'visible' : 'hidden' }` }>
                    { data.listening_artists.map(( artist, i ) => (
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
                  src = { data.listening.cover }
                  alt = { data.listening.meta.album }/>
              </div>
            </div>
          </div>
          <div className = 'player-bottom'>
            <div className = 'progress-bar'>
              <span className = 'time-show'>{ `${data.time} / ${ data.listening.durationTimeFormat }` }</span>
              <input
                type = 'range'
                min = '0'
                max = '100'
                step = '0.1'
                id = 'song-time-slider'
                onChange = { e => data.updateAudioTime( e.target, data.listening.duration, false ) }
                onClick = { e => data.updateAudioTime( e.target, data.listening.duration, true ) }
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
                  action = {( ) => changeSong( false )}/>
                <IconButton
                  icon = { data.is_playing ? test_gray : test_white }
                  alt = 'play/puse'
                  title = 'play/puse'
                  tab = '1'
                  action = {( ) => data.is_playing ? data.puaseMusic( ) : data.playMusic( )}/>
                <IconButton
                  icon = { test_gray }
                  class = 'change-song-plr'
                  alt = 'siguiente'
                  title = 'siguiente'
                  tab = '1'
                  action = {( ) => data.changeSong( true )}/>
              </div>
              <div className = 'controls-right'>
                <IconButton
                  class = { `repeat-${ data.repeat }` }
                  icon = { data.repeat === 0 ? test_gray : test_white }
                  alt = 'no repetir/uno/todos'
                  title = 'no repetir/uno/todos'
                  tab = '1'
                  action = {( ) => data.setRepeat( data.repeat === 0 ? 1 : data.repeat === 1 ? 2 : 0 )}/>
                <img
                  className = 'test-icon'
                  src = { test_gray }
                  alt = { 'shuffle' }
                  title = 'Azar'/>
              </div>
            </div>
          </div>
        </Fragment>
      }
    </PlayerDataContext.Consumer>
)

export { Player }
export default PlayerDataConsumer