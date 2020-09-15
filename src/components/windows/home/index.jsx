import React from 'react'
import * as mmb from 'music-metadata-browser'
import './index.sass'

const Home = ({ songs }) => {

  ( async () => {
    if( await songs.length > 0 )
      console.log(await mmb.parseBlob( songs[ 0 ] ))
  })()

  return (
    <div className = 'home' />
  )
}

export default Home