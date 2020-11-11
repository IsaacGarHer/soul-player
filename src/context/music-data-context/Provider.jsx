import React, { useState } from 'react'
import MusicDataContext from './Context'
import ROUTES from '../global/jsx'

const MusicDataProvider = pr => {

  const [ songs, setSongs ] = useState([ ])
  const [ lyrics, setLyrics ] = useState([ ])
  const [ artists, setArtists ] = useState([ ])

  return (
    <MusicDataContext.Provider
      value = {{
        songs: songs,
        lyrics: lyrics,
        artists: artists,
        setSongs: setSongs,
        setLyrics: setLyrics,
        setArtists: setArtists
      }}>
        { pr.children }
    </MusicDataContext.Provider>
  )
}

export default MusicDataProvider