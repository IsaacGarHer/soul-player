import React, { Fragment, useState } from 'react'
import { ROUTES } from '../../../global/jsx'
import './index.sass'

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
            song !== undefined && song.meta ?
            <div
              className = 'song'
              key = { i }>
              <img
                src = { song.cover }
                alt = { song.meta.album }
                className = 'cover'/>
              <div className = 'info'>
                <span className = 'song-title'>{ song.meta.title }</span>
                <span className = 'song-artist'>{
                  `${ song.meta.artists.map( artist => artist ) }`
                }</span>
                <span className = 'song-time'>{ song.durationTimeFormat }</span>
              </div>
              <button
                className = 'tab-indicator'
                tabIndex = { window && window === ROUTES[ 1 ] ? '0' : '-1' }
                onClick = { e => {
                  play( song.URI, song.meta )
                  e.target.blur( )
                }}/>
            </div>
            :
            <Fragment key = { i }/>
          ))
          :
          null }
        <audio src = { listening } className = 'player' controls tabIndex = '-1'/>
      </div>
    </div>
  )
}

export default Songs