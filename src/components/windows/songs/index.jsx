import React from 'react'
import * as mmb from 'music-metadata-browser' 
import './index.sass'

const Songs = ({ songs }) => {

  const metadata = song => {
    //console.log( song )
    mmb.parseBlob( song ).then( meta => {
      console.log( meta )
    })
  }

  return (
    <div className = 'songs'>
      { songs && songs.length ?
        songs.map(( song, i ) => (
          <span
            onClick = { ( ) => metadata( song ) }
            key = { i }
            style = {{ color: '#fff' }}>
            { song.name }
          </span>
        ))
        :
        null }
    </div>
  )
}

export default Songs