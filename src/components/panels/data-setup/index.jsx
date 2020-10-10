import React, { Fragment } from 'react'
import * as mmb from 'music-metadata-browser'
import './index.sass'

const DataSetup = ({ songs, setSongs }) => {

  //this method do a selection and create an array with albums without repeat the same file
  const albumFilter = ( song, meta, files ) => {
    if ( meta && songs && songs.length > 0 ){
      let album_indexing = files.findIndex( file => file.album === meta.album )
      let has_cover = song.cover ? true : false
      if ( album_indexing >= 0 && !has_cover )
        return files[ album_indexing ].cover
      if ( album_indexing < 0 && !has_cover ){
        let picture = mmb.selectCover( meta.picture )
        return URL.createObjectURL( new Blob([ picture.data.buffer ], { type: picture.type }) )
      }
    }
  }

  //this method do a convertion of time from only seconds to format h:mm:ss
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

  //this method embed the metadata the songs files
  ( async ( ) => {
    if ( await songs.length > 0 && !songs[ 0 ].meta ){
      songs.forEach( async song => {
        let { common, format } = await mmb.parseBlob( song )
        let artists = common.artist.indexOf( ';' ) ? common.artist.split( ';' ) : [ common.artist[ 0 ] ]
        let genre = common.genre.indexOf( ';' ) ? common.genre[ 0 ].split( ';' ) : common.genre

        song.cover = albumFilter( song, common, songs )
        song.duration = format.duration
        song.durationTimeFormat = toTimeFormat( format.duration )
        song.meta = {
          title: common.title,
          artists: artists,
          album: common.album,
          year: common.year,
          track_number: common.track.no,
          genre: genre,
          album_artist: common.albumartist
        }
      })
      setSongs( songs )
    }
  })( )

  return (
    <Fragment/>
  )
}

export default DataSetup