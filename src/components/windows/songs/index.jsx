import React from 'react'
import { ROUTES } from '../../../global/jsx'
import { MusicDataConsumer } from '../../../context/music-data-context'
import { PlayerDataConsumer } from '../../../context/player-data-context'
import './index.sass'

import Card from '../../common/card'

const SongsPreview = ({ music_data, player_data, window }) => (
  <div className = 'songs'>
    <div className = 'contain-sngs'>
      { music_data.songs && music_data.songs.length > 0 ?
        music_data.songs.map(( song, i ) => (
          <Card
            key = { i }
            cpn_class = 'song'
            image = { song.cover }
            alt = { song.meta === undefined ? song.name : song.meta.album }
            info = { song.meta === undefined ? [ song.name, song.name, song.durationTimeFormat ] : [ song.meta.title, `${ song.meta.artists.map( artist => artist )}`, song.durationTimeFormat ]}
            action = {( ) => player_data.beforePlaying ? player_data.beforePlaying( song, true ) : console.log( song )}
            tab = { window && window === ROUTES[ 1 ] ? '0' : '-1' }
            topics = {[[
              {
                text: 'Añadir a cola',
                action: ( ) => player_data.setPlaylist( playlist => [ ...playlist, song ])
              },
              {
                text: 'Quitar de cola',
                action: ( ) => player_data.removeSong( song )
              }
            ]]}/>
        ))
        :
        null }
    </div>
  </div>
)

const SongsPlayerPreview = PlayerDataConsumer( SongsPreview )
const Songs = MusicDataConsumer( SongsPlayerPreview )

export default Songs