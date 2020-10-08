import React, { Fragment } from 'react'
import * as mmb from 'music-metadata-browser'
import './index.sass'

const DataSetup = ({ songs, setSongs, albums, setAlbums }) => {

  //this method do a selection and create an array with albums without repeat the same file
  const albumsFilter = files => {
    if ( files.length > 0 ){
      files.forEach( async file => {
        let { common } = await mmb.parseBlob( file )
        let name = common.album
        if ( albums.findIndex( album => album.name === name ) < 0 ){
          let cover = { }
          let picture = mmb.selectCover( common.picture )
          cover.img = URL.createObjectURL( new Blob([ picture.data.buffer ], { type: picture.type }) )
          cover.name = name
          albums.push( cover )
        }
      })
      setAlbums( albums )
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
    if ( await songs.length > 0 && albums.length === 0 ){
      albumsFilter( songs )
      songs.forEach( async song => {
        let { common, format } = await mmb.parseBlob( song )
        let artists = common.artist.indexOf( ';' ) ? common.artist.split( ';' ) : [ common.artist[ 0 ] ]
        let genre = common.genre.indexOf( ';' ) ? common.genre[ 0 ].split( ';' ) : common.genre

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