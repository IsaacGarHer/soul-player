import React, { useState } from 'react'
import * as mmb from 'music-metadata-browser'
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

  //Songs and lyrics filter
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

  //This function add the cover property to each song
  const albumFilter = ( song, files ) => {
    if ( song && files.length > 0 ){
      let album_indexing = files.findIndex( file => file.meta.album === song.meta.album )
      if ( files[ album_indexing ].cover !== undefined )
        return files[ album_indexing ].cover
      if ( files[ album_indexing ].cover === undefined ) {
        let picture = mmb.selectCover( song.meta.picture )
        return URL.createObjectURL( new Blob([ picture.data.buffer ], { type: picture.type }) )
      }
    }
  }

  //This function does a conversion of time from only seconds to format hh:mm:ss
  const toTimeFormat = time => {
    let hours, minutes, seconds, result = ''
    if ( time > 3600 ){
      hours = Math.floor( time / 3600 )
      time = time % 3600
      result = `${ hours }:`
    } if ( time > 60 ){
      minutes = Math.floor( time / 60 )
      time = time % 60
      result = `${ result }${ minutes < 10 ? `0${ minutes }` : minutes }:`
    }
    seconds = Math.round( time )
    result = `${ result }${ minutes === undefined ? '00:' : '' }${ seconds < 10 ? `0${ seconds }` : seconds }`
    return result
  }

  //This function embeds the metadata in his respective songs
  const embedMeta = async songs => {
    try {
      for( let i = 0; i < songs.length; i++ ){
        let { common, format } = await mmb.parseBlob( songs[ i ] )
        let artists = common.artist.indexOf( ';' ) ? common.artist.split( ';' ) : [ common.artist[ 0 ] ]
        let genres = common.genre.indexOf( ';' ) ? common.genre[ 0 ].split( ';' ) : common.genre

        for( let x = 0; x < genres.length; x++ ){
          genres[ x ] = genres[ x ].trim( )
        }

        songs[ i ].duration = format.duration
        songs[ i ].durationTimeFormat = toTimeFormat( format.duration )
        songs[ i ].meta = {
          title: common.title,
          artists: artists,
          album: common.album,
          year: common.year,
          track_number: common.track.no,
          genres: genres,
          album_artist: common.albumartist,
          picture: common.picture
        }
      }

      return songs
    } catch( err ) {
      return err
    }
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

      embedMeta( songs_uploaded )
      .then( songs => {
        songs.forEach( song => {
          song.cover = albumFilter( song, songs )
        })
        console.log( songs )
        setSongsPath( path )
        setSongs( songs )
      })
      .catch( err => console.log( err ))
    }
  }

  //Artists uploader
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
            action = {( ) => setVisibility( false )}/>
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