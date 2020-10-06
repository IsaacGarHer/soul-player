import React, { useState, Fragment } from 'react'
import './index.sass'

const Artists = ( ) => {

  const [ artists, setArtists ] = useState([ ])
  const [ zoom, setZoom ] = useState( '' )

  const upload = e => {
    let new_artists = Array.from( e.target.files )

    for( let i = 0; i < new_artists.length; i++ ){
      new_artists[ i ].URI = URL.createObjectURL( new_artists[ i ] )
      console.log( new_artists[ i ] )
    }

    setArtists( new_artists )
  }

  return (
    <div className = 'artists'>
      <input
        type = 'file'
        className = 'upload-artists'
        name = 'upload-artists[ ]'
        accept = 'image/*'
        webkitdirectory = ''
        onChange = { e => upload( e ) } 
        multiple />
      { artists.length > 0 ?
        <div className = 'all'>
          { artists.map(( artist, i ) => (
              <Fragment key = { i }>
                <img
                  src = { artist.URI }
                  alt = { artist.path }
                  className = 'artists-cover'
                  onClick = { ( ) =>  setZoom( artist.URI ) }/>
              </Fragment>
            )) }
        </div>
        : 
        null }
      { zoom !== '' ?
        <img
          src = { zoom }
          alt = 'zoom'
          className = 'max'/>
        :
        null }
    </div>
  )
}

export default Artists