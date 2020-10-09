import React, { useState } from 'react'
import './index.sass'

import MainButton from '../../common/main-button'
import IconButton from '../../common/icon-button'

const Uploader = ({ setSongs, setLyrics, setArtists }) => {

  const [ visible, setVisibility ] = useState( true )
  const [ songs_path, setSongsPath ] = useState( '' )
  const [ artists_path, setArtistsPath ] = useState( '' )

  const closePanel = ( ) => {
    if( songs_path === '' )
      alert( 'Elige la carpeta de musica' )
    else
      setVisibility( false )
  }

  const definePath = file => {
    let path, directory

    directory = file.webkitRelativePath.split( '/' )[ 0 ]
    path = file.path.split( '\\' )
    for ( let i = path.length - 1; i > path.findIndex( part => part === directory ); i-- ){
      path.splice( i, 1 )
    }
    path = path.join( '/' )

    return path
  }

  //songs and lyrics uploader
  const audioFilesFilter = files => {
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
        setLyrics( lyrics )

      return songs.length > 0 ? songs : files
    } else
      return files
  }

  const musicFilesUploader = files => {
    files = Array.from( files )
    let songs_uploaded = audioFilesFilter( files )
    let path

    if ( songs_uploaded.length > 0 ){
      path = definePath( songs_uploaded[ 0 ] )

      songs_uploaded.forEach( song => {
        song.URI = URL.createObjectURL( song )
      })

      setSongsPath( path )
      setSongs( songs_uploaded )
    }
  }

  //artists uploader
  const artistsImagesUploader = images => {
    let path
    images = Array.from( images )
    if ( images.length > 0 ){
      path = definePath( images[ 0 ] )

      images.forEach( image => {
        image.URI = URL.createObjectURL( image )
      })

      setArtistsPath( path )
      setArtists( images )
    }
  }

  //for key navigation
  const activeElement = ( e, identify ) => {
    //key code 13 is 'enter' key
    if ( e.keyCode === 13 )
      document.getElementById( identify ).focus( )
  }

  //resolve autofocus and keydown of uploader
  return(
    <div
      className = { `uploader ${ visible ? 'visible' : 'hidden' }` }>
      <div className = 'menu' >
        <div className = 'menu-head'>
          <span className = 'panel-title'>Carpetas</span>
          <IconButton
            action = { ( ) => setVisibility( false ) }/>
        </div>
        <div className = 'menu-main'>
          <div className = 'path-changer'>
            <span className = 'path-viewer'>{ songs_path === '' ? 'Carptea de canciones' : songs_path }</span>
            <div className = 'input-path' tabIndex = '1' onKeyDown = { e => activeElement( e, 'songs-uploader' ) }>
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
                  musicFilesUploader( e.target.files )
                  e.target.blur( )
                }}/>
            </div>
          </div>
          <div className = 'path-changer'>
            <span className = 'path-viewer'>{ artists_path === '' ? 'Carptea de artistas' : artists_path }</span>
            <div className = 'input-path' tabIndex = '2' onKeyDown = { e => activeElement( e, 'artists-uploader' ) }>
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
                  artistsImagesUploader( e.target.files )
                  e.target.blur( )
                }}/>
            </div>
          </div>
          <MainButton
            id = 'save-button'
            text = 'Guardar'
            action = { closePanel }
            tab = '3'/>
        </div>
      </div>
    </div>
  )
}

export default Uploader