import React, { useState } from 'react'
import MusicDataContext from './Context'

const MusicDataProvider = ({ children }) => {

  const [ songs, setSongs ] = useState([ ])
  const [ lyrics, setLyrics ] = useState([ ])
  const [ artists, setArtists ] = useState([ ])

  const value = {
    songs: songs,
    lyrics: lyrics,
    artists: artists,
    setSongs: setSongs,
    setLyrics: setLyrics,
    setArtists: setArtists
  }

  return (
    <MusicDataContext.Provider
      value = { value }>
        { children }
    </MusicDataContext.Provider>
  )
}

export default MusicDataProvider