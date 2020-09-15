import React, { useState } from 'react'
import * as mmb from 'music-metadata-browser'
import './index.sass'

const Songs = ({ songs }) => {

  const [ metas, setMetas ] = useState([ ])

  const art = song => {
    //let casa = ''
    let casa = mmb.parseBlob( song ).then( meta => { return casa = meta.common.album })
    console.log( casa )
    return casa
  }

  ( async () => {
    let updater = [ ]
    if( await songs.length > 0 && metas.length === 0 ) {
      for( let i = 0; i < songs.length; i++ ){
        let { common } = await mmb.parseBlob( songs[ i ] )
        let allArtist = common.artist.indexOf( ';' ) ? common.artist.split( ';' ) : [ common.artist[ 0 ] ]
        let cover = mmb.selectCover( common.picture )
        let meta_song = {
          picture: URL.createObjectURL( new Blob([ cover.data.buffer ], { type: cover.type }) ),
          title: common.title,
          artists: allArtist,
          album: common.album
        }
        updater.push( meta_song )
      }
      setMetas( updater )
    }
  })()

  return (
    <div className = 'songs'>
      { metas !== undefined && metas.length > 0 && songs && songs.length > 0 ?
        metas.map(( meta, i ) => (
          <div key = { i } className = 'song'>
            <img src = { meta.picture } className = 'cover' alt = { meta.album }/>
            <div className = 'info'>
              <span className = 'title'>{ meta.title }</span>
              <span className = 'artists'>{
                `${meta.artists.length > 1 ?
                  meta.artists.map( arst => arst )
                  :
                  meta.artists[ 0 ]}`
              }</span>
            </div>
          </div>
        ))
        :
        null }
    </div>
  )
}

export default Songs