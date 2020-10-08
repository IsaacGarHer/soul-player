import React, { useState } from 'react'
import './index.sass'

import MainButton from '../../common/main-button'
import IconButton from '../../common/icon-button'

const Uploader = ({ setSongs, setLyrics, setArtists, setAlbums }) => {

  const [ visible, setVisibility ] = useState( true )
  const [ songs_path, setSongsPath ] = useState( '' )
  const [ artist_path, setArtistPath ] = useState( '' )

  const closePanel = ( ) => setVisibility( false )

  //songs and lyrics uploader
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

      return songs.length > 0 ? songs : files
    } else
      return files
  }

  const filesUploader = files => {
    files = Array.from( files )
    let songs_uploaded = filesFilter( files )
    let path

    if ( songs_uploaded.length > 0 ){
      path = songs_uploaded[ 0 ].path.split( '\\' )
      path.splice( path.length - 1, 1 )
      path = path.join( '/' )

      songs_uploaded.forEach( song => {
        song.URI = URL.createObjectURL( song )
      })

      setSongsPath( path )
      setSongs( songs_uploaded )
    }
  }

  const activeInput = ( e, identify ) => {
    //key code 13 is 'enter' key
    if ( e.keyCode === 13 )
      document.getElementById( identify ).focus( )
  }

  return(
    <div
      className = { `uploader ${ visible ? 'visible' : 'hidden' }` }>
      <div className = 'menu' >
        <div className = 'menu-head'>
          <span className = 'panel-title'>Carpetas</span>
          <IconButton/>
        </div>
        <div className = 'menu-main'>
          <div className = 'path-changer'>
            <span className = 'path-viewer'>{ songs_path === '' ? 'Carptea de canciones' : songs_path }</span>
            <div className = 'input-path' tabIndex = '0' onKeyDown = { e => activeInput( e, 'songs-uploader' ) }>
              <MainButton
                text = 'Elegir'/>
              <div className = 'focus-indicator'/>
              <input
                id = 'songs-uploader'
                type = 'file'
                className = 'file-uploader'
                webkitdirectory = 'true'
                tabIndex = '-1'
                onChange = { e => {
                  filesUploader( e.target.files )
                  e.target.blur( )
                }}/>
            </div>
          </div>
          <div className = 'path-changer'>
            <span className = 'path-viewer'>{ artist_path === '' ? 'Carptea de artistas' : artist_path }</span>
            <div className = 'input-path' tabIndex = '0' onKeyDown = { e => activeInput( e, 'artists-uploader' ) }>
              <MainButton
                text = 'Elegir'/>
              <div className = 'focus-indicator'/>
              <input
                id = 'artists-uploader'
                type = 'file'
                className = 'file-uploader'
                webkitdirectory = 'true'
                tabIndex = '-1'
                onChange = { e => {
                  setArtists( Array.from( e.target.files ) )
                  e.target.blur( )
                }}/>
            </div>
          </div>
          <MainButton
            text = 'Guardar'
            action = { closePanel }
            tab = '0'/>
        </div>
      </div>
    </div>
  )
}

export default Uploader