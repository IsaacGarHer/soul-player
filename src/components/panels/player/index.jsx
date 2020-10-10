import React from 'react'
import './index.sass'

const Player = ({ lyrics, artists }) => {
  return (
    <div style = {{ display : "none" }}>
      { lyrics && lyrics.length > 0 ?
        lyrics.map( file => (
          file.name
        ))
        :
        null }
      { lyrics && lyrics.length > 0 ?
        lyrics.map( file => (
          file.name
        ))
        :
        null }
      { lyrics && lyrics.length > 0 ?
        lyrics.map( file => (
          file.name
        ))
        :
        null }
    </div>
  )
}

export default Player