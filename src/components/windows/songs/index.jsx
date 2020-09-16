import React, { useState } from 'react'
import * as mmb from 'music-metadata-browser'
import './index.sass'

const Songs = ({ songs }) => {

  const toTimeFormat = allTime => {
    let hours, minutes, seconds, result = ''
    if( allTime > 3600 ) {
      hours = Math.floor( allTime / 3600 )
      allTime = allTime % 3600
      result = `${ hours }:`
    }
    if( allTime > 60 ) {
      minutes = Math.floor( allTime / 60 )
      allTime = allTime % 60
      result = `${ result }${ minutes < 10 ? `0${ minutes }` : minutes }:`
    }
    seconds = Math.round( allTime )
    result = `${ result }${ seconds < 10 ? `0${ seconds }` : seconds }`
    return result = `${ result } ${ hours !== undefined ? 'hr' : minutes !== undefined ? 'min' : 's' }`
  }

  ( async () => {
    let updater = [ ]
    if( await songs.length > 0 && metas.length === 0 ) {
      for( let i = 0; i < songs.length; i++ ){
        let { common } = await mmb.parseBlob( songs[ i ] )
        let { format } = await mmb.parseBlob( songs[ i ] )
        let time = toTimeFormat( format.duration )
        let allArtist = common.artist.indexOf( ';' ) ? common.artist.split( ';' ) : [ common.artist[ 0 ] ]
        let cover = mmb.selectCover( common.picture )
        let meta_song = {
          picture: URL.createObjectURL( new Blob([ cover.data.buffer ], { type: cover.type }) ),
          title: common.title,
          artists: allArtist,
          album: common.album,
          duration: time
        }
        updater.push( meta_song )
      }
      setMetas( updater )
    }
  })( )

  const [ metas, setMetas ] = useState([ ])

  return (
    <div className = 'songs'>
      { metas !== undefined && metas.length > 0 && songs && songs.length > 0 ?
        metas.map(( meta, i ) => (
          <div key = { i } className = 'song'>
            <img src = { meta.picture } className = 'cover' alt = { meta.album }/>
            <div className = 'info'>
              <span className = 'title'>{ meta.title }</span>
              <span className = 'artists'>{
                `${ meta.artists.length > 1 ?
                  meta.artists.map( arst => arst )
                  :
                  meta.artists[ 0 ]}`
              }</span>
              <span className = 'time'>{ meta.duration }</span>
            </div>
          </div>
        ))
        :
        null }
    </div>
  )
}

export default Songs