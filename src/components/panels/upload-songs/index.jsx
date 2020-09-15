import React, { useState, useEffect } from 'react'
import * as mmb from 'music-metadata-browser'
import './index.sass'

import MainButton from '../../common/main-button'

const UploadSongs = ({ songs, setSongs }) => {

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

  const addMeta = new_songs => {
    let resulted = new Array( ), temp, some_artist, cm
    new_songs.forEach( song => {
      mmb.parseBlob( song ).then( meta => {
        cm = meta.common
        some_artist = cm.artist.indexOf( ';' ) ? cm.artist.split( ';' ) : [ cm.artist[ 0 ] ]
        temp = {
          title: cm.title,
          artists: some_artist,
          album: cm.album,
          year: cm.year,
          track: cm.track.no,
          genre: cm.genre[ 0 ],
          albumArtist: cm.albumartist,
          picture: mmb.selectCover( cm.picture )
        }
        resulted.push( temp )
      })
    })
    return resulted
  }

  const upload = e => {
    let new_songs = Array.from( e.target.files )
    new_songs = filterFiles( new_songs )

    for( let i = 0; i < new_songs.length; i++ ){
      new_songs[ i ].URI = URL.createObjectURL( new_songs[ i ] )
      //songs[ i ].meta = addMeta( songs[ i ] )
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