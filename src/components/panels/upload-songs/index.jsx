import React, { useState, useEffect } from 'react'
import './index.sass'

import MainButton from '../../common/main-button'

const UploadSongs = ({ setSongs }) => {

  const [ visible, setVisibility ] = useState( true )

  const closePanel = ( ) => setVisibility( false )

  const filterFiles = files => {
    for( let i = 0; i < files.length; i++ ){
      if( files[ i ].type.indexOf( 'audio' ) === -1 ){
        files.splice( i, 1 )
        i-=1
      }
    }
    return files
  }

  const upload = e => {
    let new_songs = Array.from( e.target.files )
    new_songs = filterFiles( new_songs )

    for( let i = 0; i < new_songs.length; i++ ){
      new_songs[ i ].URI = URL.createObjectURL( new_songs[ i ] )
    }

    setSongs( new_songs )
  }

  useEffect(( ) => {
    let uploader = document.getElementsByClassName( 'uploader' )[ 0 ]
    uploader.addEventListener( 'change', e => upload( e ), false )
  })

  return(
    <div
      className = { `upload-songs ${ visible ? 'visible' : 'hidden' }` }>
      <input
        type = 'file'
        className = 'uploader'
        name = 'uploader[ ]'
        accept = 'audio/*'
        webkitdirectory = ''
        multiple />
      <MainButton
        text = 'Guardar'
        action = { closePanel }/>
    </div>
  )
}

export default UploadSongs