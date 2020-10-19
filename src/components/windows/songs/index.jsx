import React, { useState } from 'react'
import { ROUTES } from '../../../global/jsx'
import './index.sass'

import Card from '../../common/card'

const Songs = ({ songs, window }) => {

  const [ listening, setListening ] = useState( '' ) 

  const play = ( URI, meta ) => {
    setListening( URI )
    let player = document.getElementsByClassName( 'player' )[ 0 ]
    player.title = meta.title
    player.ariaLabel = meta.title
    setTimeout(( ) => {
      player.play( )
    }, 100)
  }

  return (
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
              action = {( ) => song.meta === undefined ? console.log( ) : play( song.URI, song.meta )}
              tab = { window && window === ROUTES[ 1 ] ? '0' : '-1' }/>
          ))
          :
          null }
        <audio src = { listening } className = 'player' controls tabIndex = '-1' muted/>
      </div>
    </div>
  )
}

export default Songs