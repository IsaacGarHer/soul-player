import React, { useState } from 'react'
import './index.sass'

import MainButton from '../../common/main-button'

const Uploader = ({ setSongs, setLyrics, setArtists, setAlbums }) => {

  const [ visible, setVisibility ] = useState( true )

  const closePanel = ( ) => setVisibility( false )

  const filesFilter = files => {
    if ( files.length > 0 ){
      let lyrics = [ ], songs = [ ]
      let file_extension, audio_type

      files.forEach( file => {
        file_extension = file.name.split( '.' )
        audio_type = file.type.indexOf( 'audio' )

        if ( file_extension[ file_extension.length - 1 ] === 'lrc' && audio_type === -1 ){
          lyrics.push( file )
        } else if ( audio_type !== -1 )
          songs.push( file )
      })

      if( lyrics.length > 0 )
        console.log( lyrics )
        //setLyrics( lyrics )

      return songs.length > 0 ? songs : files
    } else
      return files
  }

  const filesUploader = files => {
    files = Array.from( files )
    let songs_uploaded = filesFilter( files )

    if ( songs_uploaded.length > 0 ){
      songs_uploaded.forEach( song => {
        song.URI = URL.createObjectURL( song )
      })

      setSongs( songs_uploaded )
    }
  }

  return(
    <div
      className = { `upload-songs ${ visible ? 'visible' : 'hidden' }` }>
      <input
        type = 'file'
        className = 'songs_uploader'
        webkitdirectory = 'true'
        onChange = { e => filesUploader( e.target.files ) }/>
      <MainButton
        text = 'Guardar'
        action = { closePanel }/>
    </div>
  )
}

export default Uploader