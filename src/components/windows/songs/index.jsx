import React from 'react'
import { ROUTES } from '../../../global/jsx'
import './index.sass'

import Card from '../../common/card'

const Songs = ({ songs, window, setListening }) => (
  <div className = 'songs'>
    <div className = 'all'>
    { songs && songs.length > 0 ?
        songs.map(( song, i ) => (
          <Card
            key = { i }
            class = 'song'
            img = { song.cover }
            alt = { song.meta === undefined ? song.name : song.meta.album }
            texts = { song.meta === undefined ? [ song.name, song.name, song.durationTimeFormat ] : [ song.meta.title, `${song.meta.artists.map( artist => artist )}`, song.durationTimeFormat ]}
            action = {( ) => setListening ? setListening( song ) : console.log( song )}
            tab = { window && window === ROUTES[ 1 ] ? '0' : '-1' }/>
        ))
        :
        null }
    </div>
  </div>
)

export default Songs