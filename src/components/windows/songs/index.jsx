import React from 'react'
import { ROUTES } from '../../../global/jsx'
import './index.sass'

import Card from '../../common/card'

const Songs = ({ songs, window, lyricsStep, setPlaylist, removeSong }) => (
  <div className = 'songs'>
    <div className = 'contain-sngs'>
      { songs && songs.length > 0 ?
        songs.map(( song, i ) => (
          <Card
            key = { i }
            cpn_class = 'song'
            image = { song.cover }
            alt = { song.meta === undefined ? song.name : song.meta.album }
            info = { song.meta === undefined ? [ song.name, song.name, song.durationTimeFormat ] : [ song.meta.title, `${ song.meta.artists.map( artist => artist )}`, song.durationTimeFormat ]}
            action = {( ) => lyricsStep ? lyricsStep( song, true ) : console.log( song )}
            tab = { window && window === ROUTES[ 1 ] ? '0' : '-1' }
            topics = {[[
              {
                text: 'Añadir a cola',
                action: ( ) => setPlaylist( playlist => [ ...playlist, song ])
              },
              {
                text: 'Quitar de cola',
                action: ( ) => removeSong( song )
              }
            ]]}/>
        ))
        :
        null }
    </div>
  </div>
)

export default Songs